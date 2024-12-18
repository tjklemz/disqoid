import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTextAnalyzer } from './hooks/useTextAnalyzer'

import { usePrevious } from './hooks/usePrevious'

import styles from './TextArea.module.css'

type Props = {
    onTrigger?: (text: string) => void;
    onReset?: () => void;
}

const TRIGGER = 10

function TextArea({onTrigger, onReset}: Props) {
    const [analyze] = useTextAnalyzer()
    const [text, setText] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const prevWordCount = usePrevious(wordCount)
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        if (counter > 0 && counter % TRIGGER === 0) {
            onTrigger?.(text)
        }
    }, [counter, onTrigger])

    useEffect(() => {
        if (wordCount === 0 || wordCount < prevWordCount) {
            setCounter(0)
            return
        }
        if (wordCount > prevWordCount) {
            setCounter(c => {
                const newCounter = c + 1
                if (newCounter === TRIGGER) {
                    onTrigger?.(text)
                }
                return newCounter > TRIGGER ? newCounter % TRIGGER : newCounter;
            })
        }
    }, [wordCount])

    const handleReset = useCallback(() => {
        setText('')
        setWordCount(0)
        setCounter(0)
        onReset?.()
    }, [onReset])

    const handleChange = useCallback(async (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value
        setText(newText)
        const count = await analyze(newText)
        setWordCount(count)
    }, [analyze])

    return <div className={styles.container}>
        <textarea
            className={styles.textarea}
            value={text}
            onChange={handleChange}
            rows={10}
            cols={150}
            placeholder="Start writing..."
        />
        <div className={styles.statusbar}>
            <button onClick={handleReset}>Clear</button>
            <p>Counter: <span>{counter} / {TRIGGER}</span></p>
            <p>Words: <span>{wordCount}</span></p>
        </div>
    </div>
}

export { TextArea }
