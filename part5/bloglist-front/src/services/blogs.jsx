import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post('/api/blogs', newBlog, config)
  console.log('response', response)
  return response.data
}

const update = async newBlog => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.put(`/api/blogs/${newBlog.id}`, newBlog, config)
  console.log('response', response)
  return response.data
}

const remove = async blog => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.delete(`/api/blogs/${blog.id}`, config)
  console.log('response', response)
}

export default { getAll, setToken, create, update, remove }