import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useRef } from 'react'
import { setNotification } from '../reducers/notificationReducer'

const AddBlog = () => {
  const dispatch = useDispatch()

  const addBlogForm = useRef(null)

  const onAddDispatch = (event) => {
    event.preventDefault()

    const newBlog = {
      title: addBlogForm.current.title.value,
      author: addBlogForm.current.author.value,
      url: addBlogForm.current.url.value,
      like: 0,
    }
    addBlogForm.current.title.value = ''
    addBlogForm.current.author.value = ''
    addBlogForm.current.url.value = ''
    try {
      dispatch(createBlog(newBlog))
      dispatch(
        setNotification(
          {
            message: `a new blog ${newBlog.title} ${newBlog.author}`,
            cName: 'notify',
          },
          3000
        )
      )
    } catch (err) {
      setNotification
    }
  }
  return (
    <form onSubmit={onAddDispatch} ref={addBlogForm}>
      <div>
        <label htmlFor="title">title: </label>

        <input type="text" name="title" id="title" required />
      </div>

      <div>
        <label htmlFor="author">author: </label>

        <input type="text" name="author" id="author" required />
      </div>

      <div>
        <label htmlFor="url">url: </label>

        <input type="text" name="url" id="url" required />
      </div>

      <button type="submit">create</button>
    </form>
  )
}

export default AddBlog
