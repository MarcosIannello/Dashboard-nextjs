/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUserServerSession } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

export const postSchema = yup.object({
    title: yup.string().required(),
    done: yup.boolean().optional().default(false)
})

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const skip = searchParams.get('skip') || '0';
    const take = searchParams.get('take') || '10';

    const todos = await prisma.todo.findMany({
        skip: parseInt(skip),
        take: parseInt(take)
    });
    return NextResponse.json(todos);
}


export async function POST(req: Request) {
    try {

        const user = await getUserServerSession();

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 });

        const body = await postSchema.validate(
            await req.json()
        );

        const { title, done } = body;
        const todo = await prisma.todo.create({ data: { title, done, userId: user.id } });

        return NextResponse.json(todo, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }

}

export async function DELETE(req: Request) {
    try {
        const user = await getUserServerSession();

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 });

        await prisma.todo.deleteMany({ where: { done: true, userId: user.id } });

        console.log('Deleted done todos', 'user: ', user.name);

        return NextResponse.json({ message: 'Deleted done todos' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}