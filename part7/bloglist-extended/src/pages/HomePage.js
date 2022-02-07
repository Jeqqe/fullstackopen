import React from 'react'

import BlogList from '../components/BlogList'
import BlogForm from '../components/BlogForm'

const HomePage = ({ blogs }) => {
  if (!blogs) return ''

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <BlogForm />
        <BlogList blogs={blogs} />
      </div>
    </div>
  )
}

export default HomePage
