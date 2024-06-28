import { customRequest , customResponse } from "../../express"
import Layout from "../layout/layout.mongo"

const httpUpdateLayoutFromDashboard = async (req: customRequest , res: customResponse) => {
    if(req.user && req.body) {
        const layoutData = await Layout.findOne({profileId: req.user.profileId , index: req.body.index})
        if(layoutData) {
            const exist = layoutData.track.find((ele) => (new Date(ele.date).getTime() === new Date(req.body.date).getTime() && ele.tag === req.body.tag && ele.subject === req.body.subject))
            if(exist) {
                exist.done = req.body.done
                exist.cancelled = req.body.cancelled
                await layoutData.save()
                return res.sendStatus(200)
            }
            else {
                layoutData.track.push({ date: req.body.date , tag: req.body.tag , subject: req.body.subject , done: req.body.done , cancelled: req.body.cancelled})
                await layoutData.save();
                return res.sendStatus(200)
            }
        }
    }
}

const httpUpdateDaysNotToInclude = async (req: customRequest , res: customResponse) => {
    if(req.user && req.body){
        const layoutData = await Layout.findOne({profileId: req.user.profileId , index: req.body.index})
        if(layoutData){
            const exist = layoutData.daysNotToInclude.find((lay) => new Date(req.body.date).getTime() === new Date(lay.date).getTime())
            if(exist) {
                exist.include = req.body.include
            }
            else {
                layoutData.daysNotToInclude.push({date: req.body.date , include: req.body.include})
            }
            await layoutData.save()
            return res.sendStatus(200)
        }
        
    }
}

export {
    httpUpdateLayoutFromDashboard,
    httpUpdateDaysNotToInclude
}