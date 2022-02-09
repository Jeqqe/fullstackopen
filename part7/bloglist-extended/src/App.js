import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import { Navbar, Container, Nav } from 'react-bootstrap'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Button from './components/Button'

import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'
import UserInfoPage from './pages/UserInfoPage'
import BlogInfoPage from './pages/BlogInfoPage'

import { setToken } from './services/blogService'

import { loadBlogs } from './state/reducers/blog/reducer'
import { loadUsers } from './state/reducers/users/reducer'
import { removeUser, setUser } from './state/reducers/user/reducer'
import { setNotification } from './state/reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(loadBlogs())
    dispatch(loadUsers())

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(parsedUser))
      setToken(parsedUser.token)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    dispatch(removeUser())
    dispatch(setNotification('Successfully logged out.', 5))
  }

  // Searched user ID
  const userMatch = useRouteMatch('/users/:id')
  const matchedUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  // Searched blog ID
  const blogMatch = useRouteMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <Container>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Navbar bg='light' expand='lg'>
            <Container>
              <Navbar.Brand>Bloglist-App</Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                  <Nav.Link>
                    <Link to='/'>home</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to='/users'>users</Link>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
              <Navbar.Collapse className='justify-content-end'>
                <Navbar.Text>
                  <Container>Logged in as {user.name}</Container>
                </Navbar.Text>
                <Button
                  name='logout'
                  clickHandler={(event) => handleLogout(event)}
                />
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div></div>

          <Container>
            <Switch>
              <Route path='/users/:id'>
                <UserInfoPage user={matchedUser} />
              </Route>
              <Route path='/users'>
                <UsersPage users={users} />
              </Route>
              <Route path='/blogs/:id'>
                <BlogInfoPage blog={matchedBlog} user={user} />
              </Route>
              <Route path='/'>
                <HomePage blogs={blogs} />
              </Route>
            </Switch>
          </Container>
        </div>
      )}
    </Container>
  )
}

export default App
