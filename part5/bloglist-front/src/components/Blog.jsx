import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetailts, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetailts)
    console.log('blog', blog)
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title} <button onClick={toggleDetails}>{showDetailts ? 'hide' : 'view'}</button></p>
      {showDetailts ?
        <>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={() => updateBlog({ ...blog, likes: blog.likes + 1 })}>like</button></p>
          <p>{blog.author}</p>
          <button style={{ color: 'red' }} onClick={() => {if(window.confirm(`Remove blog ${blog.title}`)){removeBlog(blog)}}}>remove</button>
        </>
        : <></>}
    </div>
  )
}

export default Blog