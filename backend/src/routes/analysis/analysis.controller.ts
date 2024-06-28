import { addDays, format, isWithinInterval, parseISO } from "date-fns";
import { customRequest, customResponse } from "../../express";
import Layout from "../layout/layout.mongo";

const httpGetAnalysis = async (req: customRequest , res: customResponse) => {
    if(req.user) {
        const exist = await Layout.findOne({ profileId: req.user.profileId , active: true })
        if(exist) {
            const startDate = format(new Date(exist.startDate) , "yyyy-MM-dd")
            const endDate = format(new Date(exist.endDate) , "yyyy-MM-dd")

            let datei = startDate
            let subjectCount = new Map()
            let subjectAttendedMap = new Map()
            let datesNotToInclude = new Set<number>()
            
            
            // count total tags
            exist.tags.forEach((e) => {
                subjectCount.set(e,0)
                subjectAttendedMap.set(e , 0)
            })
            if(startDate === endDate) {
                let temp = format(new Date(startDate) , "EEEE")
                const dayData = (exist as any)[temp.toLowerCase()]
                dayData.forEach((e: any) => {
                    if(e.tag){
                        subjectCount.set(e.tag , subjectCount.get(e.tag)+1)
                    }
                });
            }
            else {
                while(datei != endDate){
                    let temp = format(new Date(datei) , "EEEE")
                    const dayData = (exist as any)[temp.toLowerCase()]
                    dayData.forEach((e: any) => {
                        if(e.tag){
                            subjectCount.set(e.tag , subjectCount.get(e.tag)+1)
                        }
                    });
                    datei = format(addDays(parseISO(datei), 1), "yyyy-MM-dd")
                }
            }
            
            // substract tags of not to include days
 
            exist.daysNotToInclude.forEach((e) => {
                const isDateWithinInterval = isWithinInterval(new Date(e.date) , {start: new Date(startDate) , end: new Date(endDate)})
                
                if(isDateWithinInterval && e.include === false){
                    datesNotToInclude.add(new Date(e.date).getTime())
                    const convertedDate = format(new Date(e.date), "EEEE")
                    const dayData = (exist as any)[convertedDate.toLowerCase()]
                    dayData.forEach((e: any) => {
                        if(e.tag){
                            subjectCount.set(e.tag , subjectCount.get(e.tag)-1)
                        }
                    });
                }
            })
            // exclude cancelled days
            exist.track.forEach((e) => {
                if(e.cancelled){
                    subjectCount.set(e.tag , subjectCount.get(e.tag)-1)
                }
            })
            // count how many attended
            exist.track.forEach((e) => {
                const isDateWithinInterval = isWithinInterval(new Date(e.date) , {start: new Date(startDate) , end: new Date(endDate)})
                if(isDateWithinInterval && e.done && !datesNotToInclude.has(new Date(e.date).getTime()) && !e.cancelled) {
                    subjectAttendedMap.set(e.tag , subjectAttendedMap.get(e.tag)+1)
                }
            })
            // calculate %age
            let totalTagsCnt = 0 , totalAttendedCnt = 0;
            for(const count of subjectCount.values()){
                totalTagsCnt += count
            }
            for(const count of subjectAttendedMap.values()){
                totalAttendedCnt += count
            }
            // total attendance
            const totalPercentage = totalTagsCnt? ((totalAttendedCnt/totalTagsCnt)*100).toFixed(2) : 0

            const percentageMap = new Map();

            subjectCount.forEach((total, subject) => {
                const attended = subjectAttendedMap.get(subject) || 0
                const percentage = total? (attended / total) * 100 : 0
                percentageMap.set(subject, percentage.toFixed(2))
            });
            // totalPercentage , percentageMap , datesNotToInclude
            let subjectPercentage : {subject: string , percentage: number}[] = []
            let datesNotToIncludeArray:{day: string , date: string}[] = []
            for(const value of datesNotToInclude) {
                const date = new Date(value)
                datesNotToIncludeArray.push({ day: format(date, "EEEE") , date: format(date , "yyyy-MM-dd") })
            }
            percentageMap.forEach((val , key) => {
                subjectPercentage.push({ subject: key , percentage: val })
            })
            const finalObj = {
                percentage: totalPercentage,
                subjectWisePercentage: subjectPercentage,
                datesNotIncluded: datesNotToIncludeArray
            }
            return res.send(finalObj).status(200)
        }
        else {
            return res.send({ err: 'no layout selected !' })
        }
    }
}

export {
    httpGetAnalysis
}