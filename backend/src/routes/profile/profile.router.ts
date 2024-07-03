import express from 'express'
import { httpGetProfile, httpUpdateProfile } from './profile.controller';

const profileRouter = express.Router();

profileRouter.get('/profile' , httpGetProfile)
profileRouter.post('/profile' , httpUpdateProfile)

export default profileRouter