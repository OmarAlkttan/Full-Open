import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import './App.css'
import axios from 'axios'
import AddBlog from './components/AddBlog'


const Notification = ({ message, cName}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={cName}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({message: null, cName: null})
  const [createdBlog, setCreatedBlog] = useState({title: '', author: '', url: ''})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem('loggedInUser');
    if(userJson){
      const userLog = JSON.parse(userJson)
      blogService.setToken(userLog.token)
      setUser(userLog);
    }
  }, [])

  const handleSumbit = async (event)=>{
    
    event.preventDefault();
    try{
      const result = await axios.post('/api/login', {username, password})
      console.log('result from login', result);
      window.localStorage.setItem('loggedInUser', JSON.stringify(result.data));
      setUser(result.data)
      setNotification({message: `hello, ${result.data.username}`, cName: 'notify'})
      setTimeout(() => {
        setNotification({message: null, cName: null})
      }, 3000);
    }catch(error){
      setNotification({message: error.response.data.error, cName: 'error'})
      setTimeout(() => {
        setNotification({message: null, cName: null})
      }, 3000);
    }finally{
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null);
  }

  const handleAddBlog = async (event) => {
    event.preventDefault();
    setCreatedBlog({title: '', author: '', url: ''})
    const newBlog = {
      title: createdBlog.title, author:  createdBlog.author, url: createdBlog.url, like: 0
    }
    try{
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setNotification({message: `a new blog ${blog.title} ${blog.author}`, cName: 'notify'})
      setTimeout(() => {
        setNotification({message: null, cName: null})
      }, 3000);
    }catch(error){
      console.log('error', error);
    }
  }

  return (
    <div>
      <Notification message={notification.message} cName={notification.cName}/>
      {user === null ? 
        <form onSubmit={handleSumbit}>
          <h2>Log in to application</h2>
          <div>
            <label htmlFor="username">username </label>
            <input id='username' required type="text" name='username' value={username} onChange={({target})=> {setUsername(target.value)}}/>
          </div>
          <div>
            <label htmlFor="password">password </label>
            <input type="password" required name="password" id="password" value={password} onChange={({target})=> {setPassword(target.value)}}/>
          </div>
          <button type="submit">login</button>
        </form>
        :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <br />
          <AddBlog onAdd={handleAddBlog} createdBlog={createdBlog} setCreatedBlog={setCreatedBlog}/>
          <br />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}
export default App
