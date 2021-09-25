import React from 'react'
const LoginForm = ({
    handleLogin,
    username,
    password,
    setUsername,
    setPassword,
}) => (
    <>
        <h2>Log in to application</h2>
        <form className='loginForm' onSubmit={handleLogin}>
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
    </>
)

export default LoginForm
