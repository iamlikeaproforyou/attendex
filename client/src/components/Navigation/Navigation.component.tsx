import { Link } from 'react-router-dom'
import './Navigation.styles.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Layout } from '../Layout/Layout'

const Navigation = () => {
  const [layouts , setLayouts] = useState<Layout[]>([])

  useEffect(() => {
    axios.get('/api/layout')
    .then((res) => setLayouts(res.data))
  } , [])

  const generateLayout = () => {
    axios.post('/api/layout')
      .then((res) => setLayouts(res.data))
  }
  console.log('Layout' , layouts)
  return (
    <div className="navigation">
      <div className="upper">
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/analysis">Analysis</Link></li>
          <li><Link to="/support">Support</Link></li>
        </ul>
      </div>

      <div className="lower">
        <ul>
          {
            layouts.map(
              layout => (<li key={`${layout.index}`}><Link to={`/layout/${layout.index}`}>{`Layout ${layout.index}`}</Link></li>)
            )
          }
          {/* <li><Link to="/profile">Layout 1</Link></li> */}
          <li className='new-layout-btn' onClick={generateLayout}>+Create new layout</li>
        </ul>
      </div>
    </div>
  )
}

export default Navigation