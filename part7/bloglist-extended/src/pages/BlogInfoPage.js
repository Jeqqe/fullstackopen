import React from 'react'
import { useDispatch } from 'react-redux'

import Button from '../components/Button'
import BlogCommentForm from '../components/BlogCommentForm'
import BlogCommentList from '../components/BlogCommentList'

import { addLikeToBlog, removeBlog } from '../state/reducers/blog/reducer'
import { setNotification } from '../state/reducers/notificationReducer'

import { Card } from 'react-bootstrap'

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
      <Card>
        <Card.Body>
          <Card.Title>
            {blog.title} by {blog.author}
          </Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            <p>Added by {blog.user.username}</p>
          </Card.Subtitle>
          <Card.Text>URL: {blog.url}</Card.Text>
          <Card.Text>Likes: {blog.likes}</Card.Text>
          <Button
            variant={'success'}
            name='like'
            clickHandler={() => likeButtonClick(blog)}
          />
          {user.id === blog.user.id && (
            <Button
              name='remove'
              clickHandler={() => removeButtonClick(blog)}
            />
          )}
        </Card.Body>
      </Card>
      <h1>Comments</h1>
      <BlogCommentForm blog={blog} />
      <BlogCommentList blog={blog} />
    </div>
  )
}

export default BlogInfoPage
