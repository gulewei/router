
/**
 * @typedef {string[]} Stack - mock history stack
 * @typedef {number} Pointer - point to current history entry
 * @typedef {[Stack, Pointer]} Session - stored data persistent in browser session
 * 
 * @param {string} url 
 * @param {'POP' | 'PUSH' | 'REPLACE'} [action] - history behavier
 * @param {Session} [param2=[]] - last session
 * @param {number} [pointer=window.history.length] - current history lenght
 * @returns {Session}
 */
export function nextSession(url, action, [stack = []] = [], pointer = window.history.length) {

    switch (action) {
        case 'POP':
            pointer = stack.indexOf(url)
            break
        case 'PUSH':
        case 'REPLACE':
        default:
            stack = stack.slice(0, pointer)
            stack[pointer] = url
            break
    }

    return [stack, pointer]
}

/**
 * 
 * @param {Session} param0 
 * @param {string} url 
 * @returns {number}
 */
export function delta([stack, pointer], url) {
    return stack.indexOf(url) - pointer
}
