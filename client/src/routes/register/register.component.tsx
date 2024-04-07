import React from 'react'
import './register.styles.scss'

const Register: React.FC = () => {
  return (
    <div className="register">
      <div className="left"></div>
      <div className="right">
        <h1>🔥Register</h1>
        <form action="">
          <input type="text" placeholder='Enter your email' />
          <input type="password" placeholder='Enter your password' />
          <input type="password" placeholder='Confirm your password'/>
          <button>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register