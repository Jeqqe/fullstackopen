import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Toggleable from './Toggleable'

import { addNewBlog } from '../state/reducers/blog/reducer'
import { setNotification } from '../state/reducers/notificationReducer'

import { Container, Button } from 'react-bootstrap'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleCreateNewBlog = (event) => {
    event.preventDefault()

    dispatch(
      addNewBlog({
        title,
        author,
        url,
      })
    )

    setTitle('')
    setAuthor('')
    setUrl('')

    dispatch(setNotification('Blog created.', 5))
  }

  return (
    <>
      <Toggleable buttonLabel='Create new blog'>
        <Container>
          <h2>Creating new blog...</h2>
          <form onSubmit={(event) => handleCreateNewBlog(event)}>
            <p>
              title:
              <input
                value={title}
                type='text'
                name='Title'
                onChange={({ target }) => setTitle(target.value)}
              />
            </p>
            <p>
              author:
              <input
                value={author}
                type='text'
                name='Author'
                onChange={({ target }) => setAuthor(target.value)}
              />
            </p>
            <p>
              url
              <input
                value={url}
                type='text'
                name='Url'
                onChange={({ target }) => setUrl(target.value)}
              />
            </p>
            <Button type='submit'>Create new</Button>
          </form>
        </Container>
      </Toggleable>
    </>
  )
}

export default BlogForm
