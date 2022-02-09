import React from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'

const UsersPage = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      <Table striped>
        <tbody>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <th>
                <Link to={`users/${user.id}`}>{user.username}</Link>
              </th>
              <th>{user.blogs.length}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UsersPage
