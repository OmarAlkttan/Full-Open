import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear() {
      return ''
    }
  }
})

export const { set, clear } = notificationSlice.actions

export const setNotification = (content, time) => {
  return dispatch => {
    dispatch(set(content))
    setTimeout(() => {
      dispatch(clear())
    }, time)
  }
}

export default notificationSlice.reducer