import React, {useState, useRef, useEffect} from 'react'
import TodoList from './TodoList'
import './App.css'
import { v1 as uuidv1 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }



  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '')return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv1(), name: name, complete: false}]
    })
    todoNameRef.current.value = null

  }
  function handleClearTodo() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <div className='body'>
      <img src='./logo192.png'/>
      <TodoList todos = {todos} toggleTodo={toggleTodo} />
      <h1>Things to do:</h1>
      <input ref={todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      </div>
    </>
  )
}

export default App;
