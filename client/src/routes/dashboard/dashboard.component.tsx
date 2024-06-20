import { useEffect, useState } from 'react'
import './dashboard.styles.scss'
import axios from 'axios'
import { addDays, format, parseISO } from 'date-fns'
import { Layout, DayWiseTags } from '../../components/Layout/Layout'

const Dashboard = () => {
  const [inputDate, setInputDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))
  const [weekDay, setWeekDay] = useState<string>(format(new Date(), "EEEE"))
  const [weekData , setWeekData] = useState<Layout>()
  useEffect(() => {
    axios.get('/api/dashboard')
      .then((res) => setWeekData(res.data))
  }, [])
  console.log('weekdata is' , weekData?.[weekDay.toLowerCase()])
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
          
          {weekData?.[weekDay.toLowerCase()].map((obj: DayWiseTags , index: Number) => 
          (obj.subject && obj.tag &&
            <div className="todo-day" key={`${index}`}>
              <p className="checkmark">&#10003;</p>
              <p className='content'>{obj.subject}</p>
              <p className="tag">{obj.tag}</p>
            </div>
          ))}
          {/* <div className="todo-day">
            <p className="checkmark">&#10003;</p>
            <p className='content'>Engineering drawing - EGD</p>
            <p className="tag">egd</p>
          </div> */}
        </div>
        <div className="third">
          <button>Don't include this day</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard