import { Link } from 'react-router-dom'
import './Navigation.styles.scss'
import axios from 'axios'
import { useContext, useEffect } from 'react'
import { SettingsContext } from '../../context/layout.context'

const Navigation = () => {
  const { settings, setSettings } = useContext(SettingsContext)
  const getLayouts = async () => {

    await axios.get('/api/layout')
      .then((res) => setSettings(res.data))
  }
  useEffect(() => {
    getLayouts()
  }, [])

  const generateLayout = () => {
    axios.post('/api/layout')
      .then((res) => setSettings(res.data))
  }
  const handleLayoutActivation = async (index: Number) => {

    const activeLayout = settings.find((lay) => lay.active === true)
    const layoutToActivate = settings.find((lay) => lay.index === index)
    if (activeLayout) {
      activeLayout.active = false
      await axios.post('/api/layout', activeLayout)
    }
    if (layoutToActivate) {
      layoutToActivate.active = true
      await axios.post('/api/layout', layoutToActivate)
    }
    getLayouts()
  }
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
            settings.map(layout => (
              <li key={`${layout.index}`}>
                <Link to={`/layout/${layout.index}`}>{`Layout ${layout.index}`}</Link>
                <button onClick={() => handleLayoutActivation(layout.index)} className={layout.active ? 'active' : ''}>{layout.active ? 'active' : 'activate'}</button>
              </li>
            ))
          }
          {/* <li>
            <Link to="/profile">Layout 1</Link>
            <button className='active'>active</button>
          </li> */}
          <li className='new-layout-btn' onClick={generateLayout}>+Create new layout</li>
        </ul>
      </div>
    </div>
  )
}

export default Navigation