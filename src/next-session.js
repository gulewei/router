
/**
 * 
 * @typedef {Array<string | void>} Stack a minimal mock of history stack
 * @typedef {number} Pointer current history entry
 * @typedef {[Stack, Pointer]} Session reuseable data that expected to have persistence in browser session
 * @typedef {'POP' | 'PUSH' | 'REPLACE'} Action history behavier
 * 
 * @param {string} entry - A key stands for unique history entry
 * @param {Action} action - History behavier. When initialize it shold be `POP`
 * @param {Session} [param2=[]] - Last session. When initialize it could be void
 * @param {IndexOfFn} [indexOf] - To find a history item's entry in stack. Use `Array.lastIndexOf` in default
 * 
 * @returns {Session} Next session's stack and it's pointer
 */
export function nextSession(entry, action, [stack, prevPointer] = [[]], indexOf = defaultIndexOf) {
    let pointer = window.history.length

    switch (action) {
        case 'POP':
            // when page loaded it could be a reload rather than load a new page.
            if (stack.length - 1 !== pointer) {
                if (prevPointer) {
                    stack = stack.slice(0, prevPointer + 1)
                }
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
 * @typedef {(stack: Stack, entry: string) => number} IndexOfFn default use Array.lastIndexOf
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

/**
 * 
 * @typedef {(entry: string, action: Action, lastSession: Session, indexOf?: IndexOfFn) => Session} UpdateSession
 * 
 * @param {string} storageKey 
 * @param {string} entry 
 * @param {IndexOfFn} [indexOf]
 * 
 * @returns {[Session, UpdateSession, () => Session | void]}
 */
export function withStorage(storageKey, entry, indexOf) {
    const get = () => JSON.parse(window.sessionStorage.getItem(storageKey))
    const set = (val) => {
        window.sessionStorage.setItem(storageKey, JSON.stringify(val))
        return val
    }

    const update = (entry, action, session) => set(nextSession(entry, action, session, indexOf))
    const initial = update(entry, 'POP', get() || void 0)

    return [
        initial,
        update,
        get
    ]
}
