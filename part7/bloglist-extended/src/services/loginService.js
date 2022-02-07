import axios from 'axios'
const baseUrl = '/api/login'

export const loginUser = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}
