import { describe, expect, test } from 'vitest'

import { countWords } from './text-analyzer'

describe('countWords', () => {
    test('empty', () => {
        expect(countWords(undefined)).toEqual(0)
        expect(countWords(null)).toEqual(0)
        expect(countWords('')).toEqual(0)
        expect(countWords(' ')).toEqual(0)
        expect(countWords(' \t ')).toEqual(0)
    })

    test('single', () => {
        expect(countWords('word')).toEqual(1)
        expect(countWords(' word  ')).toEqual(1)
    })

    test('multiple', () => {
        expect(countWords('more than one word')).toEqual(4)
        expect(countWords('  more      than   one    word with\trandom   padding ')).toEqual(7)
    })
})
