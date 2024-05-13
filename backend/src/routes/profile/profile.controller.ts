import { customRequest, customResponse } from "../../express"
import Profile from "./profile.mongo"

const httpGetProfile = async (req: customRequest , res: customResponse) => {
    if(req.user) {
        const profile = await Profile.findOne({ _id: req.user.profileId }).select('-_id -__v').exec()
        res.status(200).send(profile)
    }
}

export {
    httpGetProfile
}