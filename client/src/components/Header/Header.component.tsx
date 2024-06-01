import { useNavigate } from 'react-router-dom'
import './Header.styles.scss'

const Header = () => {
    const navigate = useNavigate()
    const imageClick = () => {
        navigate('/profile')
    } 
    return (
        <div className="header">
            <p>My profile</p>
            <img onClick={() => imageClick()} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-pJ76yZKPpsLu-I6-y_PJvu-lLNntGz3cDbqVODCqA&s" alt="" />
        </div>
    )
}

export default Header