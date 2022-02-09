import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { loginUser } from '../services/loginService'
import { setToken } from '../services/blogService'

import { setUser } from '../state/reducers/user/reducer'
import { setNotification } from '../state/reducers/notificationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginUser({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      dispatch(setUser(user))
      setToken(user.token)

      setUsername('')
      setPassword('')

      dispatch(setNotification('Successfully logged in.', 5))
    } catch (exception) {
      dispatch(setNotification('Incorrect login credentials', 5))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form className='loginForm' onSubmit={(event) => handleLogin(event)}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-btn' type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
