import React, { useState, useRef } from 'react'
import Toggleable from './Toggleable'

const BlogForm = ({
    blogService,
    setBlogs,
    successNotification,
    errorNotification,
}) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const blogFormRef = useRef()

    const addBlog = async (event) => {
        event.preventDefault()

        const response = await blogService.create({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        })

        if (response.status === 201) {
            blogService.getAll().then((blogs) => setBlogs(blogs))

            blogFormRef.current.toggleVisibility()
            successNotification(`a new blog ${newTitle} by ${newAuthor} added`)
        } else {
            errorNotification(response.data.error)
        }
    }

    return (
        <>
            <Toggleable buttonLabel='create new blog' ref={blogFormRef}>
                <h2>create new</h2>
                <form onSubmit={addBlog}>
                    <p>
                        title:
                        <input
                            value={newTitle}
                            type='text'
                            name='Title'
                            onChange={({ target }) => setNewTitle(target.value)}
                        />
                    </p>
                    <p>
                        author:
                        <input
                            value={newAuthor}
                            type='text'
                            name='Author'
                            onChange={({ target }) =>
                                setNewAuthor(target.value)
                            }
                        />
                    </p>
                    <p>
                        url
                        <input
                            value={newUrl}
                            type='text'
                            name='Url'
                            onChange={({ target }) => setNewUrl(target.value)}
                        />
                    </p>
                    <button type='submit'>create</button>
                </form>
            </Toggleable>
        </>
    )
}

export default BlogForm
