import { useWorker } from '@koale/useworker'
import { countWords } from '../../lib/text-analyzer'

// currently a simple wrapper
// makes it easier to mock
function useTextAnalyzer() {
    return useWorker(countWords)
}

export { useTextAnalyzer }
