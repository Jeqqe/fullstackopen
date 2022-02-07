import React from 'react'

const UserInfoPage = ({ user }) => {
  if (!user) return ''

  return (
    <div>
      <h1>{user.username}</h1>
      <h2>Added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserInfoPage
