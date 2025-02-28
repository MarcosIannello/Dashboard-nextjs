/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';
import prisma from "@/lib/prisma";
import { todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (id: string, done: boolean): Promise<todo> => {

    try {
        const todo = await prisma.todo.findUnique({ where: { id } });

        if (!todo) throw new Error('Todo not found');

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { done }
        });

        revalidatePath('/modules/dashboard/server-todos');

        return updatedTodo;
    } catch (e) {
        throw new Error('Error updating todo');
    }
}

export const createTodo = async (title: string): Promise<todo> => {
    try {
        const todo = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        }).then(res => res.json());

        revalidatePath('/modules/dashboard/server-todos');

        return todo;

    } catch (e) {
        throw new Error('Error creating todo');
    }
}

export const deleteDoneTodos = async (): Promise<void> => {
    console.log('Deleting done todos');
    try {
        await prisma.todo.deleteMany({ where: { done: true } });

        revalidatePath('/modules/dashboard/server-todos');
    } catch (e) {
        throw new Error('Error deleting done todos');
    }
}