import { NextFunction } from "express"
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

const httpCreateNewLayout = async (req: customRequest , res: customResponse , next: NextFunction) => {
    if(req.user && Object.keys(req.body).length === 0) {
        const profileId = req.user.profileId
        try{
            const docs = await Layout.find({ profileId }).exec()
            const highestId = docs.reduce((max, obj) => {
                return obj.index > max ? obj.index : max;
            }, 1);
            if(highestId >= 6) {
                return res.status(400).send({ err: 'cannot create more layout' })
            }
            const layout = await Layout.create({
                profileId: profileId,
                index: highestId+1,
                startDate: new Date(),
                endDate: new Date(),
                tags: [],
                active: false,
                monday: {},
                tuesday: {},
                wednesday: {},
                thursday: {},
                friday: {},
                saturday: {},
                sunday: {}
    
            })
            docs.push(layout)
            res.send(docs)
        }
        catch(err) {
            console.log(`Error in posting to layout collection ${err}`)
        }
    }
    else{
        next()
    }
}

const httpUpdateLayout = async (req: customRequest , res: customResponse) => {
    const data = req.body;
    if(req.user && Object.keys(data).length !== 0) {
        const profileId = req.user.profileId
        const index = data.index
        try{
            await Layout.findOneAndReplace({ profileId , index } , data , {new : true})
            return res.sendStatus(200)
        }
        catch(err) {
            console.log(`Error updating the layouts ${err}`)
        }
    }
}
export {
    httpGetLayout,
    httpCreateNewLayout,
    httpUpdateLayout
}