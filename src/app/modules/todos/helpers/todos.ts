import { todo } from "@prisma/client";


export const updateTodo = async (id: string, done: boolean): Promise<todo> => {
    const body = { done };

    const dbTodo = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());

    return dbTodo;

}

export const createTodo = async (title: string): Promise<todo> => {
    const body = { title };

    const newTodo = await fetch(`/api/todos`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());

    return newTodo;

}

export const deleteDoneTodos = async (): Promise<boolean> => {
    console.log('Deleting done todos');
    const action = await fetch(`/api/todos`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
    console.log(action);
    return false;
}