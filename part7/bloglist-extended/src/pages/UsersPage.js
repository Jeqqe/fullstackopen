import React from 'react'
import { Link } from 'react-router-dom'

const UsersPage = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
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
      </table>
    </div>
  )
}

export default UsersPage
