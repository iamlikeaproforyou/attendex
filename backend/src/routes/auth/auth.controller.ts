import { Request , Response } from 'express'

import { maxAgeInSeconds } from '../../constants'
import User from './user.mongo'
import createToken from '../../utils/createToken'

async function httpSignUpUser(req: Request , res: Response) {
    const { email , password } = req.body

    try {
        // handle the error later ...
        const user = await User.create({email , password})
        const token = createToken(user._id)
        res.cookie('jwt' , token , { httpOnly: true , maxAge: maxAgeInSeconds * 1000 })
        res.status(201).json({ user: user._id })
    }
    catch(err) {
        console.log(err)
    }
}

async function httpLoginUser(req: Request , res: Response) {
    const { email , password } = req.body

    try {
        // handle the error later ...
        const user = await User.findOne({ email })
        if(user) {
            if(password === user.password) {
                const token = createToken(user._id)
                res.cookie('jwt' , token , { httpOnly: true , maxAge: maxAgeInSeconds * 1000 })
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

export {
    httpSignUpUser,
    httpLoginUser
}