import express from 'express'
import { httpSignUpUser ,httpLoginUser } from './auth.controller'

const authRouter = express.Router()

authRouter.post('/signup' , httpSignUpUser)
authRouter.post('/login' , httpLoginUser)


export default authRouter