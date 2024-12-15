import { useEffect, useState } from 'react'
import { Profile } from '../types/api';
import { api } from '../lib/api';
import { Header } from './Header'
import { TextArea } from './TextArea';
import { Footer } from './Footer';

import styles from './App.module.css'

function App() {
    const [profile, setProfile] = useState<Profile>(null)
    useEffect(() => {
        api.getProfile().then(res => {
            setProfile(res)
        })
    }, [])

    return (
        <div className={styles.container}>
            <Header name={profile?.name} avatar={profile?.avatarUrl} />
            <TextArea />
            <Footer></Footer>
        </div>
    )
}

export { App }
