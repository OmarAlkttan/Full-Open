import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const App = () => {

  return (
    <div>
      <div>
        <button><Link to={'authors'} replace>authors</Link></button>
        <button><Link to={'books'} replace>books</Link></button>
        <button><Link to={'newBook'} replace>add book</Link></button>
      </div>

      <Outlet />
    </div>
  )
}

export default App
