import { countWords } from '../lib/text-analyzer'

function analyze(str: string) {
    return {
        wordCount: countWords(str)
    }
}

addEventListener('message', ({data}) => {
    postMessage(analyze(data))
})
