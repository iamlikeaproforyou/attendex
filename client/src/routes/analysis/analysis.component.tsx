import { useContext, useEffect, useState } from "react"
import { SettingsContext } from "../../context/layout.context"
import './analysis.styles.scss'
import axios from "axios"
import { Setting } from "../../components/Layout/Layout"
import { format } from "date-fns"

interface data {
  percentage: number,
  subjectWisePercentage: {subject: string , percentage: string}[],
  datesNotIncluded: {day: string , date: string}[]
}
const Analysis = () => {
  const [data , setData] = useState<data>({
    percentage: 0,
    subjectWisePercentage:[],
    datesNotIncluded: []
  })
  const { settings } = useContext(SettingsContext)
  const [weekData, setWeekData] = useState<Setting | undefined>()
  
  const getData = async() => {
    const response = await axios.get('/api/analysis')
    setData(response.data)
  }
  useEffect(() => {
    setWeekData(settings.find((lay) => lay.active === true))
    getData()
  }, [settings])
  return (
    <div className="analysis">
      <div className="container">
        <div className="left">
          <div className="tagwise-analysis">
            {data.subjectWisePercentage.map((e , index) => (
              <div key={`${index}`}>
                <p>{e.subject}</p>
                <p>{e.percentage}%</p>
              </div>
            ))}
          </div>
          <div className="lower-text"><p>tagwise Analysis</p></div>
        </div>
        <div className="right">
          <div className="upper">
            <p className="percentage">{data.percentage}%</p>
            <div className="lower-text">
              <p>Overall Attendance</p>
              <p>From {weekData?.startDate? format(new Date(weekData.startDate) , "yyyy-MM-dd") : ''} - to {weekData?.endDate? format(new Date(weekData.endDate) , "yyyy-MM-dd") : ''}</p>
            </div>
          </div>
          <div className="lower">
            <div className="excluded-dates">
              {data.datesNotIncluded.map((e , index) => (
                <div key={`${index}`}>
                  <p>{e.day}</p>
                  <p>{e.date}</p>
                </div>
              ))}
              
            </div>
            <div className="lower-text"><p>Excluded dates</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analysis