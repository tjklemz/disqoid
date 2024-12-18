export function countWords(str: string) {
    const s = str ? str.trim() : ''
    return s ? s.split(/\s+/).length : 0
}
