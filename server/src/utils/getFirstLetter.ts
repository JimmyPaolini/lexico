export function getFirstLetter(word: string) {
  const [l1, l2] = [...word.toLowerCase()]
  if (!l1.match(/[a-z-]/) && !l1.match(/[a-z-]/)) return "*"
  if (l1 === "-") return l2
  else return l1
}
