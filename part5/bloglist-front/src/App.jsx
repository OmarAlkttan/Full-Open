/* eslint-disable linebreak-style */
import { useEffect, useRef } from 'react'

import Blog from './components/Blog'

import blogService from './services/blogs'

import './App.css'

import AddBlog from './components/AddBlog'

import Toggable from './components/Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logout, setUser, userLogin } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification) {
    return <div className={notification.cName}>{notification.message}</div>
  }
}

const App = () => {
  const loginFormRef = useRef(null)

  const userRed = useSelector((state) => state.user)

  console.log('user from reducer', userRed)

  const toggleRef = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)

  console.log('blogs from Redux Reducer', blogs)

  useEffect(() => {
    const userJson = window.localStorage.getItem('loggedInUser')
    console.log('user Json', userJson)
    if (userJson) {
      const userLog = JSON.parse(userJson)
      blogService.setToken(userLog.token)
      dispatch(setUser(userLog))
    }
  }, [])

  const handleSumbit = async (event) => {
    event.preventDefault()

    const username = loginFormRef.current.username.value
    const password = loginFormRef.current.password.value
    console.log('username', username, 'password', password)

    dispatch(userLogin({ username, password }))

    loginFormRef.current.username.value = ''

    loginFormRef.current.password.value = ''
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(logout(null))
    dispatch(
      setNotification(
        {
          message: `bye ${userRed.username}`,
          cName: 'notify',
        },
        3000
      )
    )
  }

  return (
    <div>
      <Notification />

      {userRed === null ? (
        <form onSubmit={handleSumbit} ref={loginFormRef}>
          <h2>Log in to application</h2>

          <div>
            <label htmlFor="username">username </label>

            <input id="username" required type="text" name="username" />
          </div>

          <div>
            <label htmlFor="password">password </label>

            <input type="password" required name="password" id="password" />
          </div>

          <button id="login-button" type="submit">
            login
          </button>
        </form>
      ) : (
        <div>
          <h2>blogs</h2>

          <p>
            {userRed.name} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>

          <br />

          <Toggable buttonLabel="new blog" ref={toggleRef}>
            <AddBlog />
          </Toggable>

          <br />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
