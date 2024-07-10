import { useLocation, useNavigate } from 'react-router-dom'
import './Header.styles.scss'
import { useEffect } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { profileState } from '../../atoms'

const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const imageClick = () => {
        navigate('/profile')
    } 

    const [profile , setProfile] = useRecoilState(profileState)
    
    useEffect(() => {
        axios.get('/api/profile')
        .then((res) => setProfile({
            username: res.data.username,
            email: res.data.email,
            photoURL: res.data.photoURL
        }))
    } , [])
    return (
        <div className="header">
            <p>{location.pathname.replace("/","").charAt(0).toUpperCase() + location.pathname.slice(2)}</p>
            <img onClick={() => imageClick()} src={`/api/images/${profile.photoURL}`} alt="" />
        </div>
    )
}

export default Header