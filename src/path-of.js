export let pathOf

export default function initPathFn (name) {
  if (!pathOf) {
    pathOf = (s) => s[name]
  }
}
