import { customRequest , customResponse } from "../../express"
import Layout from "../layout/layout.mongo"

const httpGetDashboard = async (req: customRequest , res: customResponse) => {
    if(req.user) {
        const profileId = req.user.profileId
        try{
            const docs = await Layout.findOne({ profileId , active:true })
            return res.send(docs)
        }
        catch(err) {
            console.log(`Error fetching the layouts ${err}`)
        }
    }
}

export {
    httpGetDashboard
}