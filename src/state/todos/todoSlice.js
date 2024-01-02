import { createSlice } from "@reduxjs/toolkit"

// Declare the id variables
let initialID = 0 
let dragItemId = 0
let dragOverItemId = 0

const initialState = [
    {
        id: initialID++, // @Hack: Create the increasing id automatically with `initialID++`
        task: '♦ Complete online JavaScript course ♦',
        complete: true
    },
    {
        id: initialID++,
        task: '♦ Jog around the park 3x ♦',
        complete: false
    },
    {
        id: initialID++,
        task: '♦ 10 minutes meditation ♦',
        complete: false
    },
    {
        id: initialID++,
        task: '♦ Read for 1 hour ♦',
        complete: false
    },
    {
        id: initialID++,
        task: '♦ Pick up groceries ♦',
        complete: false
    },
    {
        id: initialID++,
        task: '❤ Complete Todo App on Frontend Mentor ❤',
        complete: true
    },
]

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // Action's name
        addTodo: (state, action) => {
            // Execute the actions defined in the closure:           
            // Add new items to the existing list and OVERWRITE the state using `return`
            return [...state, action.payload]
        },
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload)
        },
        completeTodo: (state, action) => {
            return state.map(todo => todo.id === action.payload.id ? action.payload : todo)
        },
        clearCompletedTodos: state => {
            return state.filter(todo => todo.complete !== true)
        },
        dragTodoEnter: (state, action) => {
            dragOverItemId = action.payload.dragOverItemId.current
        },
        reorderTodos: (state, action) => {
            // @Hack: Assign the dragged item ID when dragging ends because the mouse will finally stop at the dragged item.
            // That way, I don't need to set another action for `onDragStart`
            dragItemId = action.payload.dragItemId.current

            const movedElement = state[dragItemId]

            if (dragItemId > dragOverItemId) {
                // Moving upward
                state.splice(dragItemId, 1)
                state.splice(dragOverItemId, 0, movedElement)
                
                return state
            } else if (dragItemId < dragOverItemId) {
                // Moving downward
                state.splice(dragItemId, 1)
                state.splice(dragOverItemId, 0, movedElement)
                
                return state
            } else {
                // Not moving
                return state
            }
            
        }
    }
})


// Export reducers and actions
// Actions will be used in dispatch() where the components will use
// Reducer will be put in the 'store' where the state will use
export const {
    addTodo,
    deleteTodo,
    completeTodo,
    clearCompletedTodos,
    dragTodoEnter,
    reorderTodos,
} = todoSlice.actions

export default todoSlice.reducer