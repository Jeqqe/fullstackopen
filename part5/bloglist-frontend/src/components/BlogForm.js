import React, { useState, useRef } from 'react'
import Toggleable from './Toggleable'

const BlogForm = ({ handleCreateNewBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const blogFormRef = useRef()

    return (
        <>
            <Toggleable buttonLabel='create new blog' ref={blogFormRef}>
                <h2>create new</h2>
                <form
                    onSubmit={async (event) => {
                        await handleCreateNewBlog(
                            event,
                            newTitle,
                            newAuthor,
                            newUrl,
                            setNewTitle,
                            setNewAuthor,
                            setNewUrl,
                            blogFormRef.current
                        )
                    }}>
                    <p>
                        title:
                        <input
                            id='blogTitle'
                            value={newTitle}
                            type='text'
                            name='Title'
                            onChange={({ target }) => setNewTitle(target.value)}
                        />
                    </p>
                    <p>
                        author:
                        <input
                            id='blogAuthor'
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
                            id='blogUrl'
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
