import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export const getAllBlogsFromDatabase = () => {
  try {
    const response = axios.get(baseUrl)
    return response.then((response) => response.data)
  } catch (err) {
    return err.response
  }
}

export const addNewBlogToDatabase = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.post(baseUrl, blog, config)
    return response
  } catch (err) {
    return err.response
  }
}

const updateBlog = async (blogID, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.put(`${baseUrl}/${blogID}`, newObject, config)
    return response
  } catch (err) {
    return err.response
  }
}

export const removeBlogFromDatabase = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return response
  } catch (err) {
    return err.response
  }
}

export const addBlogLikeToDatabase = async (blog) => {
  try {
    const response = await axios.put(`${baseUrl}/${blog.id}/likes`)
    return response
  } catch (err) {
    return err.response
  }
}

export { updateBlog, setToken }
