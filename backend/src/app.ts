import express from 'express'
import authRouter from './routes/auth/auth.router'
import cookieParser from 'cookie-parser'
import profileRouter from './routes/profile/profile.router'
import { checkAuth } from './routes/auth/auth.controller'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/auth' , authRouter)
app.use('/api' , checkAuth , profileRouter)

export default app