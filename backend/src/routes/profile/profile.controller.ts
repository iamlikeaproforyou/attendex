import { customRequest, customResponse } from "../../express"
import User from "../auth/user.mongo"
import Profile from "./profile.mongo"

const httpGetProfile = async (req: customRequest , res: customResponse) => {
    if(req.user) {
        const profile = await Profile.findOne({ _id: req.user.profileId }).select('-_id -__v').exec()
        return res.status(200).send(profile)
    }
}
const httpUpdateProfile = async (req: customRequest , res: customResponse) => {
    if(req.user) {
        const profile = await Profile.findOne({ _id: req.user.profileId })
        const user = await User.findOne({ profileId : req.user.profileId })
        if(profile && user) {
            if(req.body.email != '') {
                profile.email = req.body.email
                user.email = req.body.email
            }
            if(req.body.password != '') {
                user.password = req.body.password
            }
            if(req.body.username != '') {
                profile.username = req.body.username
            }
            await profile.save()
            await user.save()
        }
        
        return res.sendStatus(200)
    }
}

const httpUpdateImage = async(req: customRequest , res: customResponse) => {
    if(req.user && req.file) {
        const profile = await Profile.findOne({ _id: req.user.profileId })
        if(profile) {
            profile.photoURL = req.file.filename
            profile.save()
            return res.sendStatus(200)
        }
    }
}

export {
    httpGetProfile,
    httpUpdateProfile,
    httpUpdateImage
}