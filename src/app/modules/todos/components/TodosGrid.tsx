'use client'
import { todos } from "@/app/models/todo.model";
import { toggleTodo } from "./actions/todo-actions";
import TodoItem from "./todoItem/TodoItem";

interface props{
    todos?: todos[];

}
export const TodosGrid = ({todos} : props) => {

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
            todos ?  todos.map((todo) => {
                return (
                    <TodoItem todo={todo} key={todo.id} updateTodo={toggleTodo}/>
                )
            }) : <p>No todos found</p>
        }
    </div>
  )
}

export default TodosGrid
