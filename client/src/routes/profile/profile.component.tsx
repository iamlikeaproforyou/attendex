import React, { useEffect, useState } from 'react'
import './profile.styles.scss'
import axios from 'axios'

interface profile {
    username: string,
    email: string,
    photoURL: string
}

const Profile: React.FC = () => {
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
        <div className="profile">
            <div className="left">
                <div className="photo">
                    <img src={profile.photoURL} alt="" />
                </div>

                <span>Profile</span>
                <p>{profile.username}</p>
                <p>{profile.email}</p>
            </div>
            <div className="right">
                <div className="upper">
                    <span>Actions</span>
                    <div>
                        <p>Change Your email</p>
                        <button>Change</button>
                    </div>
                    <div>
                        <p>Change Your Username</p>
                        <button>Change</button>
                    </div>
                    <div>
                        <p>Change Your Password</p>
                        <button>Change</button>
                    </div>
                </div>
                <div className="lower">
                    <span>Account Actions</span>
                    <div>
                        <p>Reset Your Account</p>
                        <button>Reset</button>
                    </div>
                    <div>
                        <p>Delete Your Account</p>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile