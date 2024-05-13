import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET ?? (() => { throw new Error("JWT_SECRET should be set") })()
const REACT_URL = process.env.REACT_URL ?? (() => { throw new Error("REACT_URL should be set") })()
const NODE_ENV = process.env.NODE_ENV ?? (() => { throw new Error("NODE_ENV should be set") })()

const maxAgeInSeconds = 24 * 60 * 60

const REDIRECT_URL = NODE_ENV === 'development'? REACT_URL : ''

export {
    maxAgeInSeconds,
    JWT_SECRET,
    REACT_URL,
    REDIRECT_URL
}