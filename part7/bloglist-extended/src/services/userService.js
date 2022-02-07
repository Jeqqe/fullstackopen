import axios from 'axios'
const baseUrl = '/api/users'

export const getAllUsersFromDatabase = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
