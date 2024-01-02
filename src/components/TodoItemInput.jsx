import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../state/todos/todoSlice'
import '../scss/TodoItemInput.scss'

export function TodoItemInput() {
    const [newTask, setNewTask] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)

    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

    function newTaskHandler(e) {
        setNewTask(e.target.value)
    }

    function completeInputedTodo() {
        setIsCompleted(!isCompleted)
    }

    function addNewTask(e) {
        if (e.key === 'Enter') {
            dispatch(
                addTodo({
                    id: newTask.replace(/\s/g, '') + todos.length, // @Hack: To avoid same ids
                    task: newTask,
                    complete: isCompleted
                })
            )

            setNewTask('')
            setIsCompleted(false)
        }
    }

    return (
        <div className="todo-item-input-container">
            <div
                className={isCompleted ? 'todo-item-input-checkbox checked' : 'todo-item-input-checkbox'}
                onClick={completeInputedTodo}
            ></div>
            <input
                id="todoItemInput"
                placeholder="Create a new todo..." 
                className="todo-item-input-input"
                value={newTask}
                onChange={newTaskHandler}
                onKeyUp={addNewTask}
            />
        </div>
    )
}