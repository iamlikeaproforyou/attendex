import jwt from 'jsonwebtoken'

import { maxAgeInSeconds } from '../constants'
import { Types } from 'mongoose'
import { JWT_SECRET } from '../constants'


function createToken (id: Types.ObjectId) {
    return jwt.sign({ id } , JWT_SECRET , { expiresIn: maxAgeInSeconds })
}

function verifyToken(token: string): Promise<string | null> {
    return new Promise((resolve , reject) => {

        jwt.verify(token , JWT_SECRET  , (err , decoded) => {
            if(err || !decoded || typeof decoded === 'string'){
                resolve(null)
            }
            else {
                resolve(decoded.id)
            }
        })

    })

    
}

export {
    createToken,
    verifyToken
}