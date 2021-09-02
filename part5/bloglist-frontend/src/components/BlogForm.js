import { useState } from 'react'

const BlogForm = ({ blogService, successNotification, errorNotification }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = async () => {
        const response = await blogService.create({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        })

        response.status === 201
            ? successNotification(
                  `a new blog ${newTitle} by ${newAuthor} added`
              )
            : errorNotification(response.body.error)
    }

    return (
        <>
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
                        onChange={({ target }) => setNewAuthor(target.value)}
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
                    <button type='submit'>create</button>
                </p>
            </form>
        </>
    )
}

export default BlogForm
