import React from 'react'
import './profile.styles.scss'

const Profile: React.FC = () => {
    return (
        <div className="profile">
            <div className="left">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-pJ76yZKPpsLu-I6-y_PJvu-lLNntGz3cDbqVODCqA&s" alt="" />
                <span>Profile</span>
                <p>hyper kitretsu</p>
                <p>techindustry245@gmail.com</p>
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