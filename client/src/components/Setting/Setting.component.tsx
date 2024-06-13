import React, { useContext, useState } from "react"
import { Layout } from "../Layout/Layout"
import axios from "axios"

import { ModalContext } from "../../context/modal.context"

import './Setting.styles.scss'
import Modal from "../Modal/Modal.component"
interface SettingProps {
    setting: Layout | undefined
}

const Setting: React.FC<SettingProps> = ({ setting }) => {
    const { modal, setModal } = useContext(ModalContext);

    const [newtag, setNewTag] = useState<string>('')
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTag(e.target.value)
    }
    const uploadTag = () => {
        const newArray = setting?.tags
        newArray?.push(newtag)
        axios.post('/api/layout', {
            ...setting, tags: newArray
        })
        setNewTag('')
        setModal(!modal)
    }
    const toggleModal = () => {
        setModal(!modal)
    }
    return (
        <>
            {modal &&
                <Modal>
                    <div className="tag-modal">
                        <h1>Create Tag</h1>
                        <input type="text" value={newtag} onChange={(e) => handleOnChange(e)} />
                        <button onClick={uploadTag}>+ Create Tag</button>
                    </div>
                </Modal>}

            <div className="setting">
                <div className="left">
                    <ul>
                        <li>Maths</li>
                        <li>Chemistry</li>
                    </ul>
                    <button>Create Tag</button>
                </div>
                <div className="right">
                    <ul>
                        {setting?.tags.map((tagname) => (<li>{tagname}</li>))}
                    </ul>
                    <button onClick={toggleModal}>+ Create Tag</button>
                </div>
            </div>
        </>

    )
}

export default Setting