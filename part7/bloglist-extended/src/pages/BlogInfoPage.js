import React from 'react'
import { useDispatch } from 'react-redux'

import Button from '../components/Button'

import { addLikeToBlog, removeBlog } from '../state/reducers/blog/reducer'

const BlogInfoPage = ({ blog, user }) => {
  if (!blog) return ''

  const dispatch = useDispatch()

  const likeButtonClick = (blog) => {
    dispatch(addLikeToBlog(blog))
  }

  const removeButtonClick = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
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
    </div>
  )
}

export default BlogInfoPage
