import mongoose from 'mongoose'

const dayWiseSchema = new mongoose.Schema({
    subject: {
        type: String,
    },
    tag: {
        type: String,
    }
})

const layoutSchema = new mongoose.Schema({
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    active : {
        type: Boolean,
        required: true
    },
    monday: [dayWiseSchema],
    tuesday: [dayWiseSchema],
    wednesday: [dayWiseSchema],
    thursday: [dayWiseSchema],
    friday: [dayWiseSchema],
    saturday: [dayWiseSchema],
    sunday: [dayWiseSchema],
})

const Layout = mongoose.model("Layout" , layoutSchema)

export default Layout