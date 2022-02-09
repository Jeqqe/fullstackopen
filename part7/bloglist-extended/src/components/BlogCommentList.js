import React from 'react'

const BlogCommentList = ({ blog }) => {
  return (
    <ul>
      {blog.comments.map((comment) => (
        <li key={blog.id}>{comment}</li>
      ))}
    </ul>
  )
}

export default BlogCommentList
