import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { maxAgeInSeconds } from '../constants'
import { Types } from 'mongoose'

dotenv.config()

function createToken (id: Types.ObjectId) {

    // will fix this ...
    if(!process.env.JWT_SECRET) {
        throw new Error('JWT secret is not defined')
    }
    return jwt.sign({ id } , process.env.JWT_SECRET , { expiresIn: maxAgeInSeconds })

}

export default createToken