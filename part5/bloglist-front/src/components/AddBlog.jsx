import { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'

const AddBlog = () => {
  const queryClient = useQueryClient()

  const notificationDispatch = useNotificationDispatch()

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
      notificationDispatch({ type: 'create', payload: newBlog.title })
      setTimeout(() => {
        notificationDispatch({ type: 'clear' })
      }, 3000)
    },
    onError: (err) => {
      notificationDispatch({ type: 'error', payload: err.message })
      setTimeout(() => {
        notificationDispatch({ type: 'clear' })
      }, 3000)
    },
  })

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
    newBlogMutation.mutate(newBlog)
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
