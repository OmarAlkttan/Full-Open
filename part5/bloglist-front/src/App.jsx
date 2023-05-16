/* eslint-disable linebreak-style */
import { useEffect, useRef } from 'react'

import blogService from './services/blogs'

import userService from './services/users'

import './App.css'

import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser, userLogin } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import { useQuery } from 'react-query'
import { useNotificationValue } from './NotificationContext'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'

const Notification = () => {
  const notification = useNotificationValue()
  if (notification) {
    return <div className={notification.cName}>{notification.message}</div>
  }
}

const App = () => {
  const loginFormRef = useRef(null)

  const userRed = useSelector((state) => state.user)

  console.log('user from reducer', userRed)

  const result = useQuery('blogs', blogService.getAll, {
    retry: false,
    refetchOnWindowFocus: false,
  })

  const userMatch = useMatch('/users/:id')
  console.log('userId', userMatch)

  const userResult = useQuery('users', userService.getAllUsers, {
    retry: false,
    refetchOnWindowFocus: false,
  })

  const users = userResult.isSuccess ? userResult.data : []

  console.log('users', users)

  const user =
    userMatch !== null
      ? users.find((user) => user.id === userMatch.params.id)
      : null

  console.log('user', user)
  const blogs = result.isSuccess ? result.data : []

  const blogMatch = useMatch('/blogs/:id')

  const blog =
    blogMatch !== null
      ? blogs.find((blog) => blog.id === blogMatch.params.id)
      : null

  console.log('blogs from query', blogs)

  const dispatch = useDispatch()

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
          <div style={{ backgroundColor: '#a6a6a6', padding: '10px' }}>
            <Link to={'/'} style={{ paddingRight: '10px' }}>
              blogs{' '}
            </Link>
            <Link to={'/users'} style={{ paddingRight: '10px' }}>
              users{' '}
            </Link>
            {userRed.username} logged in
            <button
              onClick={handleLogout}
              style={{ marginLeft: '10px', padding: '5px 10px' }}
            >
              logout
            </button>
          </div>
          <h2>blog app</h2>

          <br />

          <Routes>
            <Route path="/" element={<Blogs blogs={blogs} />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User user={user} />} />
            <Route path="/blogs/:id" element={<BlogView blog={blog} />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
