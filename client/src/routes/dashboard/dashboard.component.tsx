import { useContext, useEffect, useState } from 'react'
import './dashboard.styles.scss'
import { addDays, format, parseISO } from 'date-fns'
import { Setting, DayWiseTags, trackData } from '../../components/Layout/Layout'
import { SettingsContext } from '../../context/layout.context'
import axios from 'axios'

const Dashboard = () => {
  const [inputDate, setInputDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))
  const [weekDay, setWeekDay] = useState<string>(format(new Date(), "EEEE"))
  const { settings, setSettings } = useContext(SettingsContext)
  const [weekData, setWeekData] = useState<Setting | undefined>()

  useEffect(() => {
    setWeekData(settings.find((lay) => lay.active === true))
  }, [settings])

  const getLayouts = async () => {
    await axios.get('/api/layout')
      .then((res) => setSettings(res.data))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(e.target.value)
    setWeekDay(format(e.target.value, "EEEE"))
  }

  const handleIncreaseDate = () => {
    const newDate = addDays(parseISO(inputDate), 1)
    setInputDate(format(newDate, "yyyy-MM-dd"))
    setWeekDay(format(newDate, "EEEE"))
  }

  const handleDecreaseDate = () => {
    const newDate = addDays(parseISO(inputDate), -1)
    setInputDate(format(newDate, "yyyy-MM-dd"))
    setWeekDay(format(newDate, "EEEE"))
  }
  const findObjExistOrNotInTask = (subject: string, tag: string): boolean => {
    const exist = weekData?.track.find((element: trackData) => (element.tag === tag && new Date(element.date).getTime() === new Date(inputDate).getTime() && element.subject === subject))
    if (exist && exist.done) {
      return true
    }
    return false
  }
  const findDaysNotToInclude = () => {
    const exist = weekData?.daysNotToInclude.find((lay) => new Date(inputDate).getTime() === new Date(lay.date).getTime())
    if(exist && exist.include === false) {
      return true
    }

    return false
  }
  const handleCheckMark = async (trackTag: string, subject: string) => {
    await axios.post('/api/dashboard', {
      index: weekData?.index,
      date: inputDate,
      tag: trackTag,
      subject: subject,
      done: true,
      cancelled: false
    })
    getLayouts()
  }
  const handleNotIncludeDay = async (dat: boolean) => {
    await axios.post('/api/dashboard/day',{
      date: inputDate,
      include: dat,
      index: weekData?.index
    })
    getLayouts()
  }
  const handleRemoveFromTrack = async (trackTag: string , subject: string) => {
    await axios.post('/api/dashboard' , {
      index: weekData?.index,
      date: inputDate,
      tag: trackTag,
      subject: subject,
      done: false,
      cancelled: false
    })
    getLayouts()
  }
  const handleCancellation = async (trackTag: string , subject: string) => {
    await axios.post('/api/dashboard' , {
      index: weekData?.index,
      date: inputDate,
      tag: trackTag,
      subject: subject,
      done: false,
      cancelled: true
    })
    getLayouts()
  }
  const handleInclude = async (trackTag: string , subject: string) => {
    await axios.post('/api/dashboard' , {
      index: weekData?.index,
      date: inputDate,
      tag: trackTag,
      subject: subject,
      done: false,
      cancelled: false
    })
    getLayouts()
  }
  const checkCancelledOrNot = (trackTag: string , subject: string) =>{ // return true of cancelled
    const exist = weekData?.track.find((e) => {
      return ((new Date(e.date).getTime() === new Date(inputDate).getTime()) &&( e.tag == trackTag) 
        && e.subject == subject && e.cancelled === true)
    })
    if(exist) {
      return true;
    }
    return false;
  }
  return (
    <div className="dashboard">
      <div className="container">
        <div className="first">
          <div className="dashboard-left">
            <p onClick={handleDecreaseDate}>&lt;</p>
            <input type="date" value={inputDate} onChange={handleDateChange} />
            <p onClick={handleIncreaseDate}>&gt;</p>
          </div>
          <div className="dashboard-right">
            <p>{inputDate}</p>
            <p>{weekDay}</p>
          </div>
        </div>
        <div className="second">

          {weekData?.[weekDay.toLowerCase()].map((obj: DayWiseTags, index: Number) =>
          (obj.subject && obj.tag &&
            <div className="todo-day" key={`${index}`}>
              {checkCancelledOrNot(obj.tag , obj.subject)? (
                <div>
                  <p>&middot;</p>
                  <s className='content'>{obj.subject}</s>
                  <p className="tag">{obj.tag}</p>
                  <button className='cancellation-btn include' onClick={() => handleInclude(obj.tag , obj.subject)}>include</button>
                </div>
              ): (
              findObjExistOrNotInTask(obj.subject, obj.tag) ?
                (
                  <div>
                    <p className="checkmark" onClick={() => handleRemoveFromTrack(obj.tag, obj.subject)}>-</p>
                    <s className='content'>{obj.subject}</s>
                    <p className="tag">{obj.tag}</p>
                    <button className='cancellation-btn vis-hidden'>cancel</button>
                  </div>
                ) : (
                  <div>
                    <p className="checkmark" onClick={() => handleCheckMark(obj.tag, obj.subject)}>&#10003;</p>
                    <p className='content'>{obj.subject}</p>
                    <p className="tag">{obj.tag}</p>
                    {checkCancelledOrNot(obj.tag , obj.subject)?(
                      <button className='cancellation-btn include' onClick={() => handleInclude(obj.tag , obj.subject)}>include</button>
                    ):(
                      <button className='cancellation-btn' onClick={() => handleCancellation(obj.tag , obj.subject)}>cancel</button>
                    )}
                    
                  </div>
                )
              )}
            </div>
          ))}
          {/* <div className="todo-day">
            <p className="checkmark">&#10003;</p>
            <s className='content'>Engineering drawing - EGD</s>
            <p className="tag">egd</p>
          </div> */}
        </div>
        <div className="third">

          {findDaysNotToInclude()? (
            <button onClick={() => handleNotIncludeDay(true)} className='include'>Include this day</button>
          ) : (
            <button onClick={() => handleNotIncludeDay(false)}>Don't include this day</button>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default Dashboard