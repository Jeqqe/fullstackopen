import React from 'react'

import { Container, ListGroup } from 'react-bootstrap'

const UserInfoPage = ({ user }) => {
  if (!user) return ''

  return (
    <div>
      <h1>{user.username}</h1>
      <Container style={{ padding: '10px' }}>
        <h2>Added blogs</h2>
        <ListGroup>
          {user.blogs.map((blog) => (
            <ListGroup.Item key={blog.id}>
              {blog.title} by {blog.author}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  )
}

export default UserInfoPage
