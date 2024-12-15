import {ChangeEvent, useCallback, useEffect, useState} from 'react'
import textAnalyzerUrl from '../workers/text-analyzer?worker&url'

import styles from './TextArea.module.css'

const textAnalyzer = new Worker(textAnalyzerUrl, {
    type: 'module'
})

function TextArea() {
    const [text, setText] = useState('')
    const [wordCount, setWordCount] = useState(0)

    const handleAnalyze = useCallback((event: MessageEvent<any>) => {
        if ('wordCount' in event.data) {
            setWordCount(event.data.wordCount)
        }
    }, [])

    useEffect(() => {
        textAnalyzer.addEventListener('message', handleAnalyze)

        return () => textAnalyzer.removeEventListener('message', handleAnalyze)
    }, [])

    const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value
        setText(newText)
        textAnalyzer.postMessage(newText)
    }, [])

    return <div className={styles.container}>
        <textarea className={styles.textarea} value={text} onChange={handleChange} rows={10} cols={150} placeholder="Start writing..."></textarea>
        <div className={styles.statusbar}>
            <p>Words: <span>{wordCount}</span></p>
        </div>
    </div>
}

export { TextArea }
