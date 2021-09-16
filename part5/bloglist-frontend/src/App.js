import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

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

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })

            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            setUser(user)
            blogService.setToken(user.token)
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
                    <BlogForm
                        blogService={blogService}
                        successNotification={successNotification}
                        errorNotification={errorNotification}
                        setBlogs={setBlogs}
                    />
                    <BlogList
                        blogs={blogs.sort((a, b) =>
                            a.likes > b.likes ? -1 : 1
                        )}
                        setBlogs={setBlogs}
                        successNotification={successNotification}
                        errorNotification={errorNotification}
                        blogService={blogService}
                        user={user}
                    />
                </>
            )}
        </>
    )
}

export default App
