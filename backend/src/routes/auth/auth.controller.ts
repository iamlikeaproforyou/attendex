import { NextFunction} from 'express'
import { customRequest , customResponse} from '../../express'

import { maxAgeInSeconds , REDIRECT_URL } from '../../constants'
import User from './user.mongo'
import Profile from '../profile/profile.mongo'

import { createToken , verifyToken} from '../../utils/createToken'

async function httpSignUpUser(req: customRequest , res: customResponse) {
    const { email , password } = req.body

    try {
        const profile = await Profile.create({
            username: email.substring(0, email.indexOf('@')),
            email: email,
            photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-pJ76yZKPpsLu-I6-y_PJvu-lLNntGz3cDbqVODCqA&s'
        })
        const user = await User.create({email , password , profileId: profile._id})
        const token = createToken(user._id)
        res.cookie('jwt' , token , { maxAge: maxAgeInSeconds * 1000 })
        res.status(201).json({ user: user._id })
    }
    catch(err) {
        console.log(err)
    }
}

async function httpLoginUser(req: customRequest , res: customResponse) {
    const { email , password } = req.body

    try {
        // handle the error later ...
        const user = await User.findOne({ email })
        if(user) {
            if(password === user.password) {
                const token = createToken(user._id)
                res.cookie('jwt' , token , { maxAge: maxAgeInSeconds * 1000 })
                res.status(200).json({ user: user._id })
            }
            else {
                throw Error('Incorrect password')
            }
        }
        else {
            throw Error('Incorrect email')
        }

    }
    catch(err) {
        console.log(err)
    }
}

async function checkAuth(req: customRequest , res: customResponse , next: NextFunction) {

    if(req.user) {
        next()
    }
    const token = req.cookies.jwt
    if(token == null) return res.sendStatus(401)
    
    try{
        const id = await verifyToken(token)
        const user = await User.findOne({ _id: id }).select('-_id -__v').exec();
        if(!user) return res.sendStatus(401)

        req.user = user
        next()
    }
    catch(err) {
        console.log(err)
    }
}

export {
    httpSignUpUser,
    httpLoginUser,
    checkAuth
}