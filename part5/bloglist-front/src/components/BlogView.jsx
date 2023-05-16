import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'
import { useRef } from 'react'

const BlogView = ({ blog }) => {
  const queryClient = useQueryClient()

  const addCommentForm = useRef(null)

  const notificationDispatch = useNotificationDispatch()

  const addCommentMutation = useMutation(blogService.addComment, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.map((blog) => (blog.id === newBlog.id ? newBlog : blog))
      )
      notificationDispatch({ type: 'comment', payload: newBlog.title })
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

  const addComment = (event) => {
    event.preventDefault()
    console.log('comment from form', addCommentForm.current.comment.value)
    addCommentMutation.mutate({
      id: blog.id,
      comment: addCommentForm.current.comment.value,
    })
    addCommentForm.current.comment.value = ''
  }

  const handleUpdate = (blog) => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }
  if (blog) {
    return (
      <div>
        <h2>{blog.title}</h2>
        <br />
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          {blog.likes} likes{' '}
          <button
            onClick={() => {
              handleUpdate(blog)
            }}
          >
            like
          </button>
        </p>
        <p>added by {blog.author}</p>
        <br />
        <h3>comments</h3>
        <form onSubmit={addComment} ref={addCommentForm}>
          <input type="text" name="comment" id="comment" />
          <button type="submit">add comment</button>
        </form>
        {blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment}>{comment}</li>
            ))}
          </ul>
        ) : (
          <div>no comments found</div>
        )}
      </div>
    )
  }
}

export default BlogView
