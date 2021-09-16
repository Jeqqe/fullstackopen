import React from 'react'
import Blog from './Blog'

const BlogList = ({
    blogs,
    setBlogs,
    successNotification,
    errorNotification,
    blogService,
    user,
}) => (
    <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
            <Blog
                key={blog.id}
                blog={blog}
                blogs={blogs}
                setBlogs={setBlogs}
                successNotification={successNotification}
                errorNotification={errorNotification}
                blogService={blogService}
                user={user}
            />
        ))}
    </div>
)

export default BlogList
