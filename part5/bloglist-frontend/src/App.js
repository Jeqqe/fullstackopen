import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import {
    getAllBlogs,
    createNewBlog,
    setToken,
    addLikeToBlog,
    removeBlog,
} from './services/blogs'
import { loginUser } from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    const successNotification = (message) => {
        setNotification({ type: 'success', message: message })
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const errorNotification = (message) => {
        setNotification({ type: 'error', message: message })
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    useEffect(async () => {
        setBlogs(await getAllBlogs())
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginUser({
                username,
                password,
            })

            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            setUser(user)
            setToken(user.token)
            setUsername('')
            setPassword('')
            successNotification('Successfully logged in')
        } catch (exception) {
            errorNotification('Wrong credentials')
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedUser')
        setUser(null)
        successNotification('Successfully logged out')
    }

    const handleRemoveBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            const response = await removeBlog(blog)

            if (response.data.error) {
                return errorNotification(response.data.error)
            }
            successNotification(`${blog.title} by ${blog.author} removed.`)
            setBlogs(await getAllBlogs())
        }
    }

    const handleAddLikeToBlog = async (blog) => {
        const response = await addLikeToBlog(blog)

        if (response.data.error) {
            return errorNotification(response.data.error)
        }

        successNotification(`Added like to ${blog.title} by ${blog.author}.`)
        setBlogs(await getAllBlogs())
    }

    const handleCreateNewBlog = async (
        event,
        newTitle,
        newAuthor,
        newUrl,
        setNewTitle,
        setNewAuthor,
        setNewUrl,
        blogFormRef
    ) => {
        event.preventDefault()
        const response = await createNewBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        })

        if (response.data.error) {
            return errorNotification(response.data.error)
        }

        successNotification(`New blog ${newTitle} by ${newAuthor} created.`)
        setBlogs(await getAllBlogs())

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')

        blogFormRef.toggleVisibility()
    }

    return (
        <>
            <Notification notification={notification} />

            {user === null ? (
                <LoginForm
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />
            ) : (
                <>
                    <h2>blogs</h2>
                    <p>
                        {user.name} logged-in
                        <button onClick={handleLogout}>logout</button>
                    </p>
                    <BlogForm handleCreateNewBlog={handleCreateNewBlog} />
                    <BlogList
                        blogs={blogs}
                        user={user}
                        handleRemoveBlog={handleRemoveBlog}
                        handleAddLikeToBlog={handleAddLikeToBlog}
                    />
                </>
            )}
        </>
    )
}

export default App
