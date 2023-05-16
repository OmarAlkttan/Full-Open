import { useRef } from 'react'
import AddBlog from './AddBlog'
import Blog from './Blog'
import Toggable from './Toggable'

const Blogs = ({ blogs }) => {
  const toggleRef = useRef(null)

  return (
    <div>
      <Toggable buttonLabel="new blog" ref={toggleRef}>
        <AddBlog />
      </Toggable>

      <br />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
