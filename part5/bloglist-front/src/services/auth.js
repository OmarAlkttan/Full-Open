import axios from 'axios'

const login = async ({ username, password }) => {
  const result = await axios.post('/api/login', { username, password })

  console.log('result from login', result)

  return result.data
}

export default { login }