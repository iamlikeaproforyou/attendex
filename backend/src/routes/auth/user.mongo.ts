import mongoose from 'mongoose'
import { isEmail } from 'validator'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true , 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail , 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true , 'Please enter a password'],
    }
})

const User = mongoose.model('User' , userSchema)

export default User