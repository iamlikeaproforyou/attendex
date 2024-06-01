import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true , 'Please enter a username']
    },
    photoURL: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
} , {
    timestamps: true
})

const Profile = mongoose.model("Profile" , profileSchema)

export default Profile