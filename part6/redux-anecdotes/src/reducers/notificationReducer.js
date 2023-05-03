import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: "",
  reducers: {
    set: (state, action) => {
      return state = action.payload
    },
    clear: (state, action) => {
      return state = ""
    }
  }
})

export const { set, clear } = notificationSlice.actions

export const setNotification = (content, time) => {
  return (dispatch) => {
    dispatch(set(content))
    setTimeout(() => {
      dispatch(clear())
    }, time * 1000)
  }
}
export default notificationSlice.reducer