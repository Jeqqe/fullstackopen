import React from 'react'
import Toggleable from './Toggleable'

const Blog = ({ blog, user, handleRemoveBlog, handleAddLikeToBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return (
        <div className='blog'>
            <span>
                {blog.title} by {blog.author}
            </span>
            <Toggleable buttonLabel='view'>
                <div style={blogStyle}>
                    <p>URL: {blog.url}</p>
                    <p>
                        Likes: <span id='likeAmount'>{blog.likes}</span>
                        <button
                            id='likeBtn'
                            onClick={() => handleAddLikeToBlog(blog)}>
                            like
                        </button>
                    </p>
                    <p>Author: {blog.author}</p>
                    <p>{blog.user.username}</p>
                    {user.id === blog.user.id && (
                        <button
                            id='removeBtn'
                            onClick={() => handleRemoveBlog(blog)}>
                            remove
                        </button>
                    )}
                </div>
            </Toggleable>
        </div>
    )
}

export default Blog
