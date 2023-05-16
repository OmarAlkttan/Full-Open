import { createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return action.payload
    },
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { login, logout, setUser } = userSlice.actions

export const userLogin = ({ username, password }) => {
  return async dispatch => {
    try {
      const result = await authService.login({ username, password })
      console.log('result', result)
      dispatch(login(result))
      window.localStorage.setItem('loggedInUser', JSON.stringify(result))
      dispatch(
        setNotification(
          {
            message: `hello, ${username}`,
            cName: 'notify',
          },
          3000
        )
      )
    } catch (err) {
      console.log(err)
      dispatch(
        setNotification(
          { message: err.response.data.error, cName: 'error' },
          3000
        )
      )
    }
  }
}

export default userSlice.reducer