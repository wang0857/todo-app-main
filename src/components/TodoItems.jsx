import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
    deleteTodo,
    completeTodo,
    dragTodoEnter,
    reorderTodos,
} from '../state/todos/todoSlice'
import '../scss/TodoItems.scss'

export function TodoItems({ todo, index }) {

    // Use useRef() to store a fixed elements which won't be affected whenever the state updates
    // Or get the React DOM element
    const dragItemId = useRef(0)
    const dragOverItemId = useRef(0)
    const dragItemRef = useRef(null)

    const dispatch = useDispatch()

    // Todo Handlers
    function deleteTodoHandler() {
        dispatch(deleteTodo(todo.id))
    }

    function completeTodoHandler() {
        dispatch(completeTodo({
            ...todo,
            complete: !todo.complete
        }))
    }
    
    // Drag todos
    function dragStart(e) {
        dragItemId.current = parseInt(e.target.dataset.index)
        dragItemRef.current.classList.add('drag')
    }

    function dragEnter(e) {
        if (!isNaN(parseInt(e.target.dataset.index))) {
            dragOverItemId.current = parseInt(e.target.dataset.index)
        }

        dispatch(dragTodoEnter({ dragOverItemId }))
    }
        
    function sortTodos() {
        dragItemRef.current.classList.remove('drag')
        
        dispatch(reorderTodos({ dragItemId }))
    }


    return (

        <li
            id={todo.id}
            ref={dragItemRef}
            className="todo-items-container"
            data-index={index}
            draggable
            onDragStart={dragStart}
            onDragEnter={dragEnter}
            onDragOver={e => { e.preventDefault() }}
            onDragEnd={sortTodos}
        >
            <div
                className={todo.complete ? 'todo-items-checkbox checked' : 'todo-items-checkbox'}
                onClick={completeTodoHandler}
            ></div>
            <span className={todo.complete ? 'todo-items-content checked' : 'todo-items-content'}>
                {todo.task}
            </span>
            <button
                className="todo-items-delete"
                onClick={deleteTodoHandler}
            ></button>
        </li>

    )
}