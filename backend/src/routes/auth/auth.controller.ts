import { Request , Response } from 'express'

function httpSignUpUser(req: Request , res: Response) {
    res.send('Sign up triggered !')
}

export {
    httpSignUpUser
}