import { useEffect } from "react"
import { Layout } from "../Layout/Layout"
import axios from "axios"

interface SettingProps {
    setting: Layout | undefined
}

const Setting: React.FC<SettingProps> = ({ setting }) => {
    useEffect(() => {
        axios.get('/api/layout')
            .then(res => console.log(res))
    } , [])

    console.log('setting', setting)
    return (    
        <div>Setting</div>
    )
}

export default Setting

