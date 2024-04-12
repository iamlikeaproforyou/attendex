import express from 'express'
import { httpSignUpUser } from './auth.controller'

const authRouter = express.Router()

authRouter.get('/signup' , httpSignUpUser);

export default authRouter