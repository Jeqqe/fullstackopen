import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user, handleRemoveBlog, handleAddLikeToBlog }) => {
    return (
        <div>
            <h2>blogs</h2>
            {blogs
                .sort((a, b) => (a.likes > b.likes ? -1 : 1))
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={user}
                        handleRemoveBlog={handleRemoveBlog}
                        handleAddLikeToBlog={handleAddLikeToBlog}
                    />
                ))}
        </div>
    )
}

export default BlogList
