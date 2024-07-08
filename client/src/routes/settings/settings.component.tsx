import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Setting as setting } from '../../components/Layout/Layout';
import Setting from '../../components/Setting/Setting.component';

const Settings = () => {

    const { settingid } = useParams();
    const [settings , setSettings] = useState<setting[]>([])

    useEffect(() => {
        axios.get('/api/layout')
            .then(res => {
                setSettings(res.data)
            })
    }, [])
    const setting = settings.find((s) => (s.index).toString() === settingid)
    return (
        <Setting setting={setting}/>
    )
}

export default Settings