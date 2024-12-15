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

    const handleChange = useCallback((newWordCount: number) => {
        if (newWordCount > 0 && newWordCount % 10 === 0) {
            api.findComments().then(res => {
                setComments(res)
            })
        } else if (newWordCount === 0) {
            setComments([])
        }
    }, [])

    return (
        <div className={styles.container}>
            <Header name={profile?.name} avatar={profile?.avatarUrl} />
            <div>
                <TextArea onWordCountChange={handleChange} />
                <CommentList comments={comments} />
            </div>
            <Footer></Footer>
        </div>
    )
}

export { App }
