import mongoose from 'mongoose'

const dayWiseSchema = new mongoose.Schema({
    subject: {
        type: String,
    },
    tag: {
        type: String,
    }
})
const trackSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        require: true
    },
    done: {
        type: Boolean,
        required: true
    },
    cancelled: {
        type: Boolean,
        required: true
    }
})
const daysNotToIncludeSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    include:{
        type: Boolean,
        required: true
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
    track: [trackSchema],
    daysNotToInclude: [daysNotToIncludeSchema]
})

const Layout = mongoose.model("Layout" , layoutSchema)

export default Layout