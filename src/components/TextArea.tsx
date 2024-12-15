import {ChangeEvent, useCallback, useEffect, useState} from 'react'
import textAnalyzerUrl from '../workers/text-analyzer?worker&url'

import styles from './TextArea.module.css'

type Props = {
    onWordCountChange?: (wordCount: number) => void;
}

function TextArea({onWordCountChange}: Props) {
    const [textAnalyzer, setTextAnalyzer] = useState<Worker>(null)
    const [text, setText] = useState('')
    const [wordCount, setWordCount] = useState(0)

    useEffect(() => {
        onWordCountChange(wordCount)
    }, [wordCount, onWordCountChange])

    const handleReset = useCallback(() => {
        setText('')
        setWordCount(0)
    }, [onWordCountChange])

    const handleAnalyze = useCallback((event: MessageEvent<any>) => {
        if ('wordCount' in event.data) {
            setWordCount(event.data.wordCount)
        }
    }, [onWordCountChange])

    const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value
        setText(newText)
        textAnalyzer?.postMessage(newText)
    }, [textAnalyzer])

    useEffect(() => {
        const textAnalyzer = new Worker(textAnalyzerUrl, {
            type: 'module'
        })
        setTextAnalyzer(textAnalyzer)
        textAnalyzer.addEventListener('message', handleAnalyze)
        return () => textAnalyzer.terminate()
    }, [])

    return <div className={styles.container}>
        <textarea className={styles.textarea} value={text} onChange={handleChange} rows={10} cols={150} placeholder="Start writing..."></textarea>
        <div className={styles.statusbar}>
            <button onClick={handleReset}>Clear</button>
            <p>Words: <span>{wordCount}</span></p>
        </div>
    </div>
}

export { TextArea }
