import { useCallback, useEffect, useState } from 'react'
import { Comment, Profile } from '../types/api';
import { api } from '../lib/api';
import { Header } from './Header'
import { TextArea } from './TextArea';
import { CommentList } from './CommentList';
import { Footer } from './Footer';

import styles from './App.module.css'

function App() {
    const [profile, setProfile] = useState<Profile>(null)
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => {
        api.getProfile().then(res => {
            setProfile(res)
        })
    }, [])

    const handleReset = useCallback(() => {
        setComments([])
    }, [])

    const handleTrigger = useCallback(() => {
        api.findComments().then(res => {
            setComments(res)
        })
    }, [])

    return (
        <div className={styles.container}>
            <Header name={profile?.name} avatar={profile?.avatarUrl} />
            <div>
                <TextArea onTrigger={handleTrigger} onReset={handleReset} />
                <CommentList comments={comments} />
            </div>
            <Footer></Footer>
        </div>
    )
}

export { App }
