import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <div key={blog.id}>
            <Link to={`blogs/${blog.id}`}>
              {`${blog.title} by ${blog.author}`}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default BlogList
