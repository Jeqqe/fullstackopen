import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addCommentToBlog } from '../state/reducers/blog/reducer'
import { setNotification } from '../state/reducers/notificationReducer'

const BlogCommentForm = ({ blog }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const handleCreateNewBlog = (event) => {
    event.preventDefault()

    dispatch(addCommentToBlog(blog, comment))
    setComment('')
    dispatch(setNotification('Comment added.', 5))
  }

  return (
    <div>
      <form onSubmit={(event) => handleCreateNewBlog(event)}>
        <p>
          <input
            value={comment}
            type='text'
            name='Title'
            onChange={({ target }) => setComment(target.value)}
          />
        </p>
        <button type='submit'>add comment</button>
      </form>
    </div>
  )
}

export default BlogCommentForm
