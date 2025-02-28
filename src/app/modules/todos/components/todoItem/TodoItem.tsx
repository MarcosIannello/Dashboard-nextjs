/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { todos } from "@/app/models/todo.model"
import { todo } from "@prisma/client"
import { startTransition, useOptimistic } from 'react'
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5"
import { toggleTodo } from "../actions/todo-actions"
import style from './TodoItem.module.css'

interface props {
    todo: todos,
    updateTodo: (id: string, done: boolean) => Promise<todo>
}

export const TodoItem = ({todo, updateTodo} : props) => {

  const [optimisticTodo, setOptimisticTodo] = useOptimistic(todo,
    (state, doneValue: boolean) => {
      return {
        ...state,
        done: doneValue
      }
    }
  )

  const onToggleTodo = async () => {
    try{
      startTransition(async () => {
        setOptimisticTodo(!optimisticTodo.done);
        await toggleTodo(todo.id, !optimisticTodo.done);
      })


    }catch(e){
      setOptimisticTodo(!optimisticTodo.done);
    }
  }



  return (
    <div className={`${optimisticTodo.done ? style.todoDone : style.todoPending} flex justify-center items-center`}>
        <div className={`flex justify-center items-center gap-4`}>
            <div onClick={onToggleTodo} className={
              `flex justify-center items-center p-2 rounded-md cursor-pointer hover:bg-opacity-60 bg-blue-200
              ${todo.done ? 'bg-blue1500' : 'bg-red-200'}
              `}
            >
              {
                optimisticTodo.done ?  <IoCheckboxOutline size={40}/> : <IoSquareOutline size={40}/> 
              }
            </div>
            <div className="text-center">
              <h5 className="text-xl text-black text-center">{optimisticTodo.title}</h5>
            </div>
        </div>
    </div>
  )
}

export default TodoItem
