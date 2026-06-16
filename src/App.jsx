import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Build a React app', completed: true },
    { id: 2, text: 'Push to GitHub', completed: false },
    { id: 3, text: 'Set up CI pipeline', completed: false },
  ])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')

  const addTodo = () => {
    if (!input.trim()) return
    setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const remaining = todos.filter(t => !t.completed).length

  return (
    <div className="app">
      <div className="container">
        <h1>My Tasks</h1>
        <p className="subtitle">{remaining} task{remaining !== 1 ? 's' : ''} remaining</p>

        <div className="todo-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new task..."
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <div className="todo-filter">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              className={filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <ul className="todo-list">
          {filtered.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <button className="check-btn" onClick={() => toggleTodo(todo.id)}>
                {todo.completed ? '✓' : ''}
              </button>
              <span className="todo-text">{todo.text}</span>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>✕</button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && <p className="empty">No tasks yet. Add one above!</p>}
      </div>
    </div>
  )
}

export default App
