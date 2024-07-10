import express from 'express'
import path from 'path'
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

app.use('/api/images', express.static(path.join(__dirname, '..' , 'uploads')))
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname , '..' , 'public')));
    app.use('/*' , (req , res) => {
        return res.sendFile(path.join(__dirname , '..' , 'public' , 'index.html'));
    })
}
export default app