// types
interface SettingProps {
    setting: Layout | undefined
}
interface ModalType {
    newTag: boolean;
    dateSetting: boolean;
    newEntry: boolean;
}
interface StateDateObject {
    startDate: string,
    endDate: string
}
interface NewEntryData {
    subject: string,
    tag: string
}
import React, { useContext, useState } from "react"
import { Setting as Layout } from "../Layout/Layout"
import axios from "axios"

import { ModalContext } from "../../context/modal.context"

import './Setting.styles.scss'
import Modal from "../Modal/Modal.component"
import { SettingsContext } from "../../context/layout.context";

const Setting: React.FC<SettingProps> = ({ setting }) => {

    const { modal, setModal } = useContext(ModalContext);
    const {setSettings} = useContext(SettingsContext)

    const getLayouts = async () => {
        await axios.get('/api/layout')
          .then((res) => setSettings(res.data))
    }

    const [newtag, setNewTag] = useState<string>('')
    const [modalType, setModalType] = useState<ModalType>({
        newTag: false,
        dateSetting: false,
        newEntry: false
    });
    const [date, setDate] = useState<StateDateObject>({
        startDate: '',
        endDate: ''
    });
    const [pTagId, setpTagId] = useState<string>('')
    const [newEntryData, setNewEntryData] = useState<NewEntryData>({
        subject: '',
        tag: ''
    })


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTag(e.target.value)
    }
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name == 'startDate') {
            const endDate = date.endDate
            setDate({
                startDate: e.target.value,
                endDate
            })
        }
        else if (e.target.name == 'endDate') {
            const startDate = date.startDate
            setDate({
                startDate,
                endDate: e.target.value
            })
        }
    }

    const handleDateSubmit = async () => {
        if (date.startDate === '' && date.endDate === '') {
            return new Error('Date cannot be an empty field')
        }

        const newObj = { ...setting, startDate: date.startDate, endDate: date.endDate }

        await axios.post('/api/layout', newObj)
        getLayouts()
        setModal(!modal)
        setModalType({
            dateSetting: false,
            newTag: false,
            newEntry: false
        })
    }
    const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEntryData((prevData) => ({
            ...prevData,
            subject: e.target.value
        }))
    }

    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setNewEntryData((prevData) => ({
            ...prevData,
            tag: value,
        }));
    };

    const handleNewEntrySubmit = async () => {
        if (pTagId == '1') 
            {setting?.monday.push(newEntryData)}
        else if(pTagId == '2')
            {setting?.tuesday.push(newEntryData)}
        else if(pTagId == '3')
            {setting?.wednesday.push(newEntryData)}
        else if(pTagId == '4')
            {setting?.thursday.push(newEntryData)}
        else if(pTagId == '5')
            {setting?.friday.push(newEntryData)}
        else if(pTagId == '6')
            {setting?.saturday.push(newEntryData)}
        else if(pTagId == '7')
            {setting?.sunday.push(newEntryData)}
        await axios.post('/api/layout' , {...setting })
        getLayouts()
        setModal(!modal)
    }
    const uploadTag = async () => {
        const newArray = setting?.tags
        newArray?.push(newtag)
        await axios.post('/api/layout', {
            ...setting, tags: newArray
        })
        getLayouts()
        setNewTag('')
        setModal(!modal)
        setModalType({
            dateSetting: false,
            newTag: false,
            newEntry: false
        })
    }
    const openNewEntryModal = (e: React.MouseEvent<HTMLParagraphElement>) => {
        const target = e.target as HTMLParagraphElement
        setpTagId(target.id)
        setModal(!modal)
        setModalType({
            dateSetting: false,
            newTag: false,
            newEntry: true
        })
    }
    const openNewTagModal = () => {
        setModal(!modal)
        setModalType({
            dateSetting: false,
            newTag: true,
            newEntry: false
        })
    }
    const openDateSettingModal = () => {
        setModal(!modal);
        setModalType({
            dateSetting: true,
            newTag: false,
            newEntry: false
        })
    }

    return (
        <>
            {modal && modalType.newTag &&
                <Modal>
                    <div className="modal-container">
                        <h1>Create Tag</h1>
                        <input type="text" value={newtag} className="tag-modal-input" onChange={(e) => handleOnChange(e)} />
                        <button onClick={uploadTag}>+ Create Tag</button>
                    </div>
                </Modal>
            }
            {modal && modalType.newEntry &&
                <Modal>
                    <div className="modal-container">
                        <h1>New entry</h1>
                        <input type="text" className="tag-modal-input" onChange={handleSubjectChange} />
                        <select className="select-options" onChange={handleTagChange}>
                            <option value="">Select a tag</option>
                            {setting?.tags.map((tag,index) => <option value={tag} key={`${index}`}>{tag}</option>)}
                        </select>
                        <button onClick={handleNewEntrySubmit}>+ Create Entry</button>
                    </div>
                </Modal>
            }
            {modal && modalType.dateSetting &&
                <Modal>
                    <div className="modal-container">
                        <h1>Date setting</h1>
                        <span>Start date</span>
                        <input type="date" name="startDate" className="date-modal-input" onChange={handleDateChange} />
                        <span>End date</span>
                        <input type="date" name="endDate" onChange={handleDateChange} className="date-modal-input" />
                        <button onClick={handleDateSubmit}>Confirm date</button>
                    </div>
                </Modal>
            }

            <div className="setting">
                <div className="left">
                    <div className="setting-btn"><button onClick={openDateSettingModal}>setting</button></div>

                    {/* copy from here for new block  */}
                    <div className="setting-content" key="1">
                        <div className="setting-title">
                            <h1>Monday</h1>
                            <p onClick={openNewEntryModal} id="1">+</p>
                        </div>
                        <hr />
                        {setting?.monday.map((temp, index) => (
                            temp && temp.subject && temp.tag ? (
                                <div className="setting-list" key={index}>
                                    <p className="title">{temp.subject}</p>
                                    <p className="tag">{temp.tag}</p>
                                </div>
                            ) : null
                        ))}

                        {/* for new tag copy from here  */}
                        {/* <div className="setting-list">
                            <p className="title">Maths-SD</p>
                            <p className="tag">Maths</p>
                        </div> */}
                    </div>


                    {/* copy from here for new block  */}
                    <div className="setting-content" key="2">
                        <div className="setting-title">
                            <h1>Tuesday</h1>
                            <p onClick={openNewEntryModal} id="2">+</p>
                        </div>
                        <hr />
                        {setting?.tuesday.map((temp, index) => (
                            temp && temp.subject && temp.tag ? (
                                <div className="setting-list" key={index}>
                                    <p className="title">{temp.subject}</p>
                                    <p className="tag">{temp.tag}</p>
                                </div>
                            ) : null
                        ))}
                    </div>


                    {/* copy from here for new block  */}
                    <div className="setting-content" key="3">
                        <div className="setting-title">
                            <h1>Wednesday</h1>
                            <p onClick={openNewEntryModal} id="3">+</p>
                        </div>
                        <hr />
                        {setting?.wednesday.map((temp, index) => (
                            temp && temp.subject && temp.tag ? (
                                <div className="setting-list" key={index}>
                                    <p className="title">{temp.subject}</p>
                                    <p className="tag">{temp.tag}</p>
                                </div>
                            ) : null
                        ))}
                    </div>

                    {/* copy from here for new block  */}
                    <div className="setting-content" key="4">
                        <div className="setting-title">
                            <h1>Thursday</h1>
                            <p onClick={openNewEntryModal} id="4">+</p>
                        </div>
                        <hr />
                        {setting?.thursday.map((temp, index) => (
                            temp && temp.subject && temp.tag ? (
                                <div className="setting-list" key={index}>
                                    <p className="title">{temp.subject}</p>
                                    <p className="tag">{temp.tag}</p>
                                </div>
                            ) : null
                        ))}
                    </div>

                    {/* copy from here for new block  */}
                    <div className="setting-content" key="5">
                        <div className="setting-title">
                            <h1>Friday</h1>
                            <p onClick={openNewEntryModal} id="5">+</p>
                        </div>
                        <hr />
                        {setting?.friday.map((temp, index) => (
                            temp && temp.subject && temp.tag ? (
                                <div className="setting-list" key={index}>
                                    <p className="title">{temp.subject}</p>
                                    <p className="tag">{temp.tag}</p>
                                </div>
                            ) : null
                        ))}
                    </div>

                    {/* copy from here for new block  */}
                    <div className="setting-content" key="6">
                        <div className="setting-title">
                            <h1>Saturday</h1>
                            <p onClick={openNewEntryModal} id="6">+</p>
                        </div>
                        <hr />
                        {setting?.saturday.map((temp, index) => (
                            temp && temp.subject && temp.tag ? (
                                <div className="setting-list" key={index}>
                                    <p className="title">{temp.subject}</p>
                                    <p className="tag">{temp.tag}</p>
                                </div>
                            ) : null
                        ))}
                    </div>
                    
                    {/* copy from here for new block  */}
                    <div className="setting-content" key="7">
                        <div className="setting-title">
                            <h1>Sunday</h1>
                            <p onClick={openNewEntryModal} id="7">+</p>
                        </div>
                        <hr />
                        {setting?.sunday.map((temp, index) => (
                            temp && temp.subject && temp.tag ? (
                                <div className="setting-list" key={index}>
                                    <p className="title">{temp.subject}</p>
                                    <p className="tag">{temp.tag}</p>
                                </div>
                            ) : null
                        ))}
                    </div>
                </div>
                <div className="right">
                    <ul>
                        {setting?.tags.map((tagname , index) => (<li key={`${index}`}>{tagname}</li>))}
                    </ul>
                    <button onClick={openNewTagModal}>+ Create Tag</button>
                </div>
            </div>
        </>

    )
}

export default Setting