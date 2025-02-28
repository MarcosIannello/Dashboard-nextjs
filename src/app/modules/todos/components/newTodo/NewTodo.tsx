'use client';

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

import { createTodo } from "../../helpers/todos";
import { deleteDoneTodos } from "../actions/todo-actions";



export const NewTodo = () => {

    const router = useRouter();

    const [title, setTitle] = useState('');

    const newTodo = async (e: FormEvent) => {
        e.preventDefault();


        if (!title) return;

        await createTodo(title);

        router.refresh();

    }

    const deleteCompleted = async () => {
        await deleteDoneTodos();
        router.refresh();
    }

    return (
        <form onSubmit={newTodo} className='flex w-full p-5 items-center justify-center gap-2'>
            <div className="flex items-center gap-2 w-full">
                <input
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    className="h-12 rounded-lg border-2 w-full border-gray-200 outline-none focus:border-sky-500 transition-all"
                    placeholder="¿Qué necesita ser hecho?" />
            </div>
            <div className="flex justify-end gap-2 min-w-32">
                <button type='submit' onClick={() => createTodo} className="flex items-center w-24 justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
                    Crear
                </button>

                <button
                    onClick={() => deleteCompleted()}
                    type='button' className="flex gap-2 items-center justify-center w-24 rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
                    <IoTrashOutline />
                    Delete
                </button>
            </div>

        </form>
    )
}