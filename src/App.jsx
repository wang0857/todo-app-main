import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TodoItemInput } from './components/TodoItemInput'
import { TodoItems } from './components/TodoItems'
import { clearCompletedTodos } from './state/todos/todoSlice'
import './scss/App.scss'


function App() {
  // Themes Handling
  const [darkTheme, setDarkTheme] = useState(false)
  
  function themeHandler() {
    setDarkTheme(!darkTheme)
  }
  
  if(darkTheme) {
    document.body.style.backgroundColor = 'hsl(235, 21%, 11%)'
  } else {
    document.body.style.backgroundColor = 'hsl(0, 0%, 98%)'
  }
  
  // Get the 'todos' state from the 'store' using `useSelector`
  const todos = useSelector(state => state.todos)
  const leftTodos = todos.filter(todo => todo.complete === false)
  const [todoList, setTodoList] = useState(todos)
  const dispatch = useDispatch()

  function renderTodoList(e) {
    // Class list handling
    const categories = document.querySelectorAll('.todo-list-footer-middle span')
    categories.forEach(category => {
      category.classList.remove('active')
    })

    e.target.classList.add('active')

    // Render the todo list
    switch (e.target.innerText) {
      case 'All':
        setTodoList(todos)
        break
      case 'Active':
        setTodoList(todos.filter(todo => todo.complete === false))
        break
      case 'Completed':
        setTodoList(todos.filter(todo => todo.complete === true))
        break
      default:
        setTodoList(todos)
    }
  }

  // Ensure the todoList is updated whenever the todos updates
  useEffect(() => {
    setTodoList(todos)
  }, [todos])

  // Clear all completed todos
  function clearAllCompleted() {
    dispatch(clearCompletedTodos())
  }
  

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <header>
        <div className="header-container">
          <h1>TODO</h1>
          <button className="toggle-theme" onClick={themeHandler}></button>
        </div>
        <TodoItemInput />
      </header>
      <main>
        <div className="todo-list-container">
          <ul className="todo-list">
              {
                todoList.map((todo, index) => <TodoItems key={todo.id} todo={todo} index={index} />)
              }
          </ul>
          <div className="todo-list-footer">
            <span className="todo-list-footer-left">
              { leftTodos.length } items left
            </span>
            <div className="todo-list-footer-middle">
              <span className="active" onClick={renderTodoList}>All</span>
              <span onClick={renderTodoList}>Active</span>
              <span onClick={renderTodoList}>Completed</span>
            </div>
            <button
              className="todo-list-footer-right"
              onClick={clearAllCompleted}
            >
              Clear Completed
            </button>
          </div>
        </div>

        <div className="todo-list-footer-middle mobile">
            <span className="active" onClick={renderTodoList}>All</span>
            <span onClick={renderTodoList}>Active</span>
            <span onClick={renderTodoList}>Completed</span>
        </div>
        <p className="footer-text">Drag and drop to reorder list</p>
      </main>
    </div>
  )
}

export default App
