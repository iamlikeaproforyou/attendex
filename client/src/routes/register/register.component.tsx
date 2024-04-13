import React, { useState } from 'react'
import './register.styles.scss'
import axios from 'axios'

const Register: React.FC = () => {
  const [email , setEmail] = useState<string>('')
  const [password , setPassword] = useState<string>('')
  const [confirmPassword , setConfirmPassword] = useState<string>('')

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // call the server here ....
    if(password === confirmPassword) {
      axios.post('/auth/signup' , {
        email , 
        password
      })
      .then((res) => {
        console.log(res)
      })
    }
    else {
      console.log('password and confirm password do not match')
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }
  return (
    <div className="register">
      <div className="left"></div>
      <div className="right">
        <h1>🔥Register</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter your email' value={email} onChange={(e) => handleEmail(e)}/>
          <input type="password" placeholder='Enter your password' value={password} onChange={(e) => handlePassword(e)}/>
          <input type="password" placeholder='Confirm your password' value={confirmPassword} onChange={(e) => handleConfirmPassword(e)}/>
          <button>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register