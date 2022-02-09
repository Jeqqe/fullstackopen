import React from 'react'
import { useDispatch } from 'react-redux'

import Button from '../components/Button'
import BlogCommentForm from '../components/BlogCommentForm'
import BlogCommentList from '../components/BlogCommentList'

import { addLikeToBlog, removeBlog } from '../state/reducers/blog/reducer'
import { setNotification } from '../state/reducers/notificationReducer'

const BlogInfoPage = ({ blog, user }) => {
  if (!blog) return ''

  const dispatch = useDispatch()

  const likeButtonClick = (blog) => {
    dispatch(addLikeToBlog(blog))
  }

  const removeButtonClick = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
      dispatch(setNotification('Blog removed.', 5))
    }
  }

  return (
    <div>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <p>URL: {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <Button name='like' clickHandler={() => likeButtonClick(blog)} />
      <p>Added by {blog.user.username}</p>
      {user.id === blog.user.id && (
        <Button name='remove' clickHandler={() => removeButtonClick(blog)} />
      )}
      <h1>Comments</h1>
      <BlogCommentForm blog={blog} />
      <BlogCommentList blog={blog} />
    </div>
  )
}

export default BlogInfoPage
