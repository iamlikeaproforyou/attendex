
import express from 'express'

export interface customRequest extends express.Request {
    user?: {
        email: string,
        password: string,
        profileId: object
    }
}

export interface customResponse extends express.Response {}