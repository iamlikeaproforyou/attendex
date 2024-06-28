import { useNavigate } from 'react-router-dom'
import './Header.styles.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface profile {
    username: string,
    email: string,
    photoURL: string
}

const Header = () => {
    const navigate = useNavigate()
    const imageClick = () => {
        navigate('/profile')
    } 

    const [profile , setProfile] = useState<profile>({
        username: '',
        email: '',
        photoURL: ''
    })
    
    useEffect(() => {
        axios.get('/api/profile')
        .then((res) => setProfile(res.data))
    } , [])
    return (
        <div className="header">
            <p>My profile</p>
            <img onClick={() => imageClick()} src={profile.photoURL} alt="" />
        </div>
    )
}

export default Header