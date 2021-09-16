import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    try {
        const response = await axios.post(baseUrl, newObject, config)
        return response
    } catch (err) {
        return err.response
    }
}

const update = async (blogID, newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.put(`${baseUrl}/${blogID}`, newObject, config)
    return response.data
}

const remove = async (blog) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return response.data
}

const addLike = async (blog) => {
    const response = await axios.put(`${baseUrl}/${blog.id}/likes`)
    return response.data
}

export default { getAll, create, update, remove, addLike, setToken }
