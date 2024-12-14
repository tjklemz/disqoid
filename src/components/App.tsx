import { useEffect, useState } from 'react'
import { Profile } from '../types/api';
import { api } from '../api';
import { Header } from './Header'
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
            <h1>Welcome to Disqoid</h1>
            <Footer></Footer>
        </div>
    )
}

export { App }
