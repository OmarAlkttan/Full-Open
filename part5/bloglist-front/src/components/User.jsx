const User = ({ user }) => {
  if (user) {
    return (
      <div>
        <h2>{user.name}</h2>
        <br />
        <h4>added blogs</h4>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default User
