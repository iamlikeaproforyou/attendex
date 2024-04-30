import { Link } from 'react-router-dom'
import './Navigation.styles.scss'

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="upper">
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/analysis">Analysis</Link></li>
          <li><Link to="/support">Support</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navigation