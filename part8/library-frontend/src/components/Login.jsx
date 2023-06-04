import { useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { LOGIN } from '../queries'
import { TokenDispatchContext } from '../providers/TokenProvider'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useContext(TokenDispatchContext)
  const navigate = useNavigate()

  const [login, result] = useMutation(LOGIN)

  const onLogin = async (event) => {
    event.preventDefault()

    login({
      variables: {
        username,
        password,
      },
    })

    if (result.data) {
      dispatch({
        type: 'add',
        payload: result.data.login.value,
      })
      localStorage.setItem('username', username)
      navigate('/authors')
    }
  }

  return (
    <div>
      <form style={{ margin: '2rem 0' }} onSubmit={onLogin}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
