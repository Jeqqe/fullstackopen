import React from 'react'
import Toggleable from './Toggleable'

const RemoveBtn = ({ blogService, blog, setBlogs }) => (
    <button
        onClick={async () => {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
                await blogService.remove(blog)
                const blogs = await blogService.getAll()
                setBlogs(blogs)
            }
        }}>
        remove
    </button>
)

const LikeBtn = ({ blogService, blog, setBlogs }) => (
    <button
        onClick={async () => {
            await blogService.addLike(blog)
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }}>
        like
    </button>
)

const Blog = ({ blogService, blog, setBlogs, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return (
        <>
            {blog.title} by {blog.author}
            <Toggleable buttonLabel='view'>
                <div style={blogStyle}>
                    <p>URL: {blog.url}</p>
                    <p>
                        Likes: {blog.likes}{' '}
                        <LikeBtn
                            blogService={blogService}
                            blog={blog}
                            setBlogs={setBlogs}
                        />
                    </p>
                    <p>Author: {blog.author}</p>
                    <p>{blog.user.username}</p>
                </div>
                {user.id === blog.user.id && (
                    <RemoveBtn
                        blogService={blogService}
                        blog={blog}
                        setBlogs={setBlogs}
                    />
                )}
            </Toggleable>
        </>
    )
}

export default Blog
