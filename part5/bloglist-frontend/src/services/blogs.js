import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAllBlogs = () => {
    try {
        const response = axios.get(baseUrl)
        return response.then((response) => response.data)
    } catch (err) {
        return err.response
    }
}

const createNewBlog = async (newObject) => {
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

const updateBlog = async (blogID, newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    try {
        const response = await axios.put(
            `${baseUrl}/${blogID}`,
            newObject,
            config
        )
        return response
    } catch (err) {
        return err.response
    }
}

const removeBlog = async (blog) => {
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

const addLikeToBlog = async (blog) => {
    try {
        const response = await axios.put(`${baseUrl}/${blog.id}/likes`)
        return response
    } catch (err) {
        return err.response
    }
}

export {
    getAllBlogs,
    createNewBlog,
    updateBlog,
    removeBlog,
    addLikeToBlog,
    setToken,
}
