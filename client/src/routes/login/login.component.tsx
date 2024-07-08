import axios from 'axios'
import React, { useState } from 'react'
import './login.styles.scss'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import { Link } from 'react-router-dom'

const Login: React.FC = () => {
  const [email , setEmail] = useState<string>('')
  const [password , setPassword] = useState<string>('')
  const {setAuth} = useContext(AuthContext)

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
      if(res.status === 200) {
        setAuth(true)
      }
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
          <p>Not a user? <Link to={"/register"}>Register</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login