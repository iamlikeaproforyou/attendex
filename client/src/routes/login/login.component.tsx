import axios from 'axios'
import React, { useState } from 'react'
import './login.styles.scss'

const Login: React.FC = () => {
  const [email , setEmail] = useState<string>('')
  const [password , setPassword] = useState<string>('')

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // call the server here ...
    axios.post('/auth/login' , {
      email,
      password
    })
    .then((res) => {
      console.log(res)
    })

    setEmail('')
    setPassword('')
  }
  return (
    <div className="login">
      <div className="left"></div>
      <div className="right">
        <h1>👋 Welcome Back !</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter your email' value={email} onChange={handleEmail}/>
          <input type="password" placeholder='Enter your password' value={password} onChange={handlePassword}/>
          <button>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login