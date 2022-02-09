import React from 'react'
import { Link } from 'react-router-dom'

import { Container, ListGroup } from 'react-bootstrap'

const BlogList = ({ blogs }) => {
  return (
    <div style={{ padding: '10px' }}>
      <h2>All blogs:</h2>
      <Container>
        <ListGroup>
          {blogs
            .sort((a, b) => (a.likes > b.likes ? -1 : 1))
            .map((blog) => (
              <ListGroup.Item key={blog.id}>
                <Link to={`blogs/${blog.id}`}>
                  {`${blog.title} by ${blog.author}`}
                </Link>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Container>
    </div>
  )
}

export default BlogList
