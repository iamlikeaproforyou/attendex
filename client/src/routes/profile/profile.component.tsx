import React, { useContext, useEffect, useState } from 'react'
import './profile.styles.scss'
import axios from 'axios'
import Modal from '../../components/Modal/Modal.component'
import { ModalContext } from '../../context/modal.context'
import { useRecoilState } from 'recoil'
import { profileState } from '../../atoms'

interface ModifiedProfile{
    email: string,
    password: string,
    username: string
}
const Profile: React.FC = () => {
    const {modal , setModal} = useContext(ModalContext) 
    const [profile , setProfile] = useRecoilState(profileState);

    const [file , setFile] = useState<File | null>(null)
    const getProfile = async () => {
        await axios.get('/api/profile')
        .then((res) => setProfile({
            username: res.data.username,
            email: res.data.email,
            photoURL: res.data.photoURL
        }))
    }
    useEffect(() => {
        getProfile()
    } , [])
    const [modalType , setModalType] = useState<string>('')
    const [modifiedProfile , setModifiedProfile] = useState<ModifiedProfile>({
        email: '',
        password: '',
        username: ''
    })
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModifiedProfile((prev) => ({...prev , email: e.target.value}))
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModifiedProfile((prev) => ({...prev , password: e.target.value}))
    }
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModifiedProfile((prev) => ({...prev , username: e.target.value}))
    }
    const handleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        setModal(true)
        const buttonType = e.currentTarget.name
        setModalType(buttonType)
    }
    const handleUploadImageModal = () => {
        setModal(true)
        setModalType('uploadImage')
    }
    const handleSubmit = async () => {
        await axios.post('/api/profile' , modifiedProfile)
        alert('profile updated')
        setModal(false)
        setModifiedProfile({
            username: '',
            email: '',
            password: ''
        })
        getProfile()
    }
    const handleFileUpload = async () => {
        if(file) {
            const formData = new FormData() 
            formData.append('file' , file)

            await axios.post('/api/profile/imageupdate' , formData)
            setFile(null)
            setModal(false)
            getProfile()
        }

    }
    return (
        <>
        {modal && modalType === 'email' &&
            <Modal>
                <div className='modal-container'>
                    <h1>Change email</h1>
                    <input type="email" className='modal-input' onChange={handleEmailChange} value={modifiedProfile.email}/>
                    <button onClick={handleSubmit}>Change your email</button>
                </div>
            </Modal>
        }
        {modal && modalType === 'password' &&
            <Modal>
                <div className='modal-container'>
                    <h1>Change password</h1>
                    <input type="password" className='modal-input' onChange={handlePasswordChange}/>
                    <button onClick={handleSubmit}>Change your password</button>
                </div>
            </Modal>
        }
        {modal && modalType === 'username' &&
            <Modal>
                <div className='modal-container'>
                    <h1>Change username</h1>
                    <input type="text" className='modal-input' onChange={handleUsernameChange}/>
                    <button onClick={handleSubmit}>Change your username</button>
                </div>
            </Modal>
        }
        {modal && modalType === 'uploadImage' &&
            <Modal>
                <div className="modal-container">
                    <h1>Upload image</h1>
                    <input id='profileImage' type="file" name="profileImage" onChange={(e) => e.target.files? setFile(e.target.files[0]) : setFile(null)}/>     
                    <button onClick={handleFileUpload}>submit</button>
                </div>
            </Modal>
        }
        <div className="profile">
            <div className="left">
                <div className="photo">
                    <img src={`/api/images/${profile.photoURL}`} alt="" onClick={handleUploadImageModal}/>
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
                        <button name='email' onClick={handleModal}>Change</button>
                    </div>
                    <div>
                        <p>Change Your Username</p>
                        <button name='username' onClick={handleModal}>Change</button>
                    </div>
                    <div>
                        <p>Change Your Password</p>
                        <button name='password' onClick={handleModal}>Change</button>
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
        </>
    )
}

export default Profile