
import { getUserServerSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { todo } from "@prisma/client";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
    params: {
        id: string;
    }
}

const putSchema = yup.object({
    done: yup.boolean().optional(),
    title: yup.string().optional()
})

export const getTodo = async (id: string): Promise<todo | null> => {
    const user = await getUserServerSession();

    if (!user) return null;

    const todo = await prisma.todo.findUnique({ where: { id: id } });

    if (todo?.userId !== user.id) return null;

    return todo;

}

export async function GET(request: Request, { params }: Segments) {

    const todo = await getTodo(params.id);

    if (!todo) return NextResponse.json({ error: 'Todo not found' }, { status: 404 });

    return NextResponse.json(todo);
}

export async function PUT(req: Request, { params }: Segments) {

    const id = params.id;

    const todo = await getTodo(id);

    if (!todo) return NextResponse.json({ error: 'Todo not found' }, { status: 404 });


    try {
        const { done, title } = await putSchema.validate(await req.json());

        const updatedTodo = await prisma.todo.update({
            where: { id: id },
            data: { done, title }
        });

        return NextResponse.json(updatedTodo, { status: 200 });

    } catch (error) {

        return NextResponse.json({ message: error }, { status: 400 });

    }
}
