import './login.styles.scss'

import React from 'react'

const Login: React.FC = () => {
  return (
    <div className="login">
      <div className="left"></div>
      <div className="right">
        <h1>👋 Welcome Back !</h1>
        <form action="">
          <input type="text" placeholder='Enter your email' />
          <input type="password" placeholder='Enter your password' />
          <button>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login