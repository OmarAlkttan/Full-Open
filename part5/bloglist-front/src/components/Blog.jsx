import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [showDetailts, setShowDetails] = useState(false)

  const queryClient = useQueryClient()

  const notificationDispatch = useNotificationDispatch()

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.map((blog) => (blog.id === newBlog.id ? newBlog : blog))
      )
      notificationDispatch({ type: 'like', payload: newBlog.title })
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

  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.filter((blog) => blog.id !== newBlog.id)
      )
      notificationDispatch({ type: 'remove', payload: newBlog.title })
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

  const update = (newBlog) => {
    updateBlogMutation.mutate(newBlog)
  }

  const remove = (blog) => {
    removeBlogMutation.mutate(blog)
  }

  const toggleDetails = () => {
    setShowDetails(!showDetailts)
    console.log('blog', blog)
  }

  return (
    <div style={blogStyle}>
      <p>
        <Link to={`blogs/${blog.id}`}>{blog.title}</Link>{' '}
        <button onClick={toggleDetails}>
          {showDetailts ? 'hide' : 'view'}
        </button>
      </p>
      {showDetailts ? (
        <>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{' '}
            <button onClick={() => update({ ...blog, likes: blog.likes + 1 })}>
              like
            </button>
          </p>
          <p>{blog.author}</p>
          <button
            style={{ color: 'red' }}
            onClick={() => {
              if (window.confirm(`Remove blog ${blog.title}`)) {
                remove(blog)
              }
            }}
          >
            remove
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Blog
