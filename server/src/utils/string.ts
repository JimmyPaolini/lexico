export function normalize(str: string): string {
  if (!str) return ""
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export function getFirstLetter(word: string) {
  const [l1, l2] = [...word.toLowerCase()]
  if (!l1.match(/[a-z-]/) && !l1.match(/[a-z-]/)) return "*"
  if (l1 === "-") return l2
  else return l1
}
