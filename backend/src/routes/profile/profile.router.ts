import express from 'express'
import { httpGetProfile } from './profile.controller';

const profileRouter = express.Router();

profileRouter.get('/profile' , httpGetProfile)

export default profileRouter