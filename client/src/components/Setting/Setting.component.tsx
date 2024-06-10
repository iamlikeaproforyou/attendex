import React, { useState } from "react"
import { Layout } from "../Layout/Layout"
import axios from "axios"

import './Setting.styles.scss'
interface SettingProps {
    setting: Layout | undefined
}

const Setting: React.FC<SettingProps> = ({ setting }) => {
    const [newtag , setNewTag] = useState<string>('')
    const handleOnChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setNewTag(e.target.value)
    }
    const uploadTag = () => {
        const newArray = setting?.tags
        newArray?.push(newtag)
        axios.post('/api/layout' , {
            ...setting , tags: newArray
        })
        setNewTag('')
    }
    return (
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
                <div>
                    <input type="text" value={newtag} onChange={(e) => handleOnChange(e)}/>
                    <button onClick={uploadTag}>+ Create Tag</button>
                </div>
            </div>
        </div>
    )
}

export default Setting