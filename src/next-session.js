
/**
 * 
 * 
 * @typedef {Array<string | void>} Stack - a minimal mock of history stack
 * @typedef {number} Pointer - current history entry
 * @typedef {[Stack, Pointer]} Session - reuseable data that expected to have persistence in browser session
 * 
 * @param {string} entry - A key stands for unique history entry
 * @param {'POP' | 'PUSH' | 'REPLACE'} action - History behavier. When initialize it shold be `POP`
 * @param {Session} [param2=[]] - Last session. When initialize it could be void
 * @param {IndexOfFn} [indexOf] - To find a history item's entry in stack. Use `Array.lastIndexOf` in default
 * 
 * @returns {Session} Next session's stack and it's pointer
 */
export function nextSession(entry, action, [stack] = [[void 0]], indexOf = defaultIndexOf) {
    let pointer = window.history.length

    switch (action) {
        case 'POP':
            // when page loaded it could be a reload rather than load a new page.
            if (stack.length - 1 !== pointer) {
                return nextSession(entry, 'PUSH', [stack], indexOf)
            }
            pointer = indexOf(stack, entry)
            break
        case 'PUSH':
        case 'REPLACE':
        default:
            stack = stack.slice(0, pointer)
            stack[pointer] = entry
            break
    }

    return [stack, pointer]
}

/**
 * 
 * @typedef {(stack: Stack, url: string) => number} IndexOfFn default use Array.lastIndexOf
 * 
 * @type {IndexOfFn}
 */
function defaultIndexOf(stack, entry) {
    return stack.lastIndexOf(entry)
}

/**
 * 
 * @param {Session} param0 
 * @param {string} entry 
 * @param {IndexOfFn} [indexOf] - default use Array.lastIndexOf
 * 
 * @returns {number}
 */
export function delta([stack, pointer], entry, indexOf = defaultIndexOf) {
    return indexOf(stack, entry) - pointer
}
