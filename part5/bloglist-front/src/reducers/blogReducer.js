import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    add(state, action) {
      state.push(action.payload)
    },
    update(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    },
    remove(state, action) {
      return state.filter(blog => blog.id !== action.payload.id)
    }
  }
})

export const { setBlogs, add, update, remove } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const createdBlog = await blogService.create(newBlog)
    dispatch(add(createdBlog))
  }
}

export const updateBlog = (newBlog) => {
  return async dispatch => {
    dispatch(update(newBlog))
    await blogService.update(newBlog)
  }
}

export const removeBlog = (newBlog) => {
  return async dispatch => {
    dispatch(remove(newBlog))
    try {
      await blogService.remove(newBlog)
      dispatch(setNotification({
        message: `${newBlog.title} has been removed`,
        cName: 'notify'
      }, 3000))

    } catch (err) {
      dispatch(setNotification({
        message: err.message.data.error,
        cName: 'error'
      }, 3000))
    }
  }
}

export default blogSlice.reducer