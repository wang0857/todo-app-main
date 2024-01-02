import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todos/todoSlice'

export default configureStore({
  reducer: {
    todos: todoReducer,
  },
})