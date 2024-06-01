import { customRequest, customResponse } from "../../express"
import Layout from "./layout.mongo"

const httpGetLayout = async (req: customRequest , res: customResponse) => {
    if(req.user) {
        const profileId = req.user.profileId
        try{
            const docs = await Layout.find({ profileId }).exec()
            return res.send(docs)
        }
        catch(err) {
            console.log(`Error fetching the layouts ${err}`)
        }
    }
}

export {
    httpGetLayout
}