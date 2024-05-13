import mongoose, { Schema } from 'mongoose'
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
    },
    profileId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    }
})

const User = mongoose.model('User' , userSchema)

export default User