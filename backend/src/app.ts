import express from 'express'
import authRouter from './routes/auth/auth.router'
import cookieParser from 'cookie-parser'
import profileRouter from './routes/profile/profile.router'
import layoutRouter from './routes/layout/layout.router'
import dashboardRouter from './routes/dashboard/dashboard.router'
import analysisRouter from './routes/analysis/analysis.router'
import { checkAuth } from './routes/auth/auth.controller'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/auth' , authRouter)
app.use('/api' , checkAuth , profileRouter)
app.use('/api', checkAuth , layoutRouter)
app.use('/api', checkAuth , dashboardRouter)
app.use('/api' , checkAuth , analysisRouter)
export default app