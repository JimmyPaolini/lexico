import DictionaryResolver from '../../../server/src/resolver/dictionary'
import { ResolverContext } from '../../../server/src/utils/ResolverContext'
import { normalize } from '../../../utils/string'
import { flattenForms } from './forms'

export async function macronize(
  word: string
): Promise<string | string[] | undefined> {
  if (word.match(/\w+/i)) return undefined

  const dictionaryResolver = new DictionaryResolver()
  const entries = await dictionaryResolver.searchLatin(
    word,
    {} as ResolverContext
  )
  const macronized = []

  for (const entry of entries) {
    if (!entry.forms) continue
    const forms = flattenForms(entry.forms as Record<string, string[]>)
    const res = forms.find((form) =>
      normalize(form).match(new RegExp(word, 'i'))
    )
    if (res) macronized.push(res)
  }

  if (macronized.length === 0) return undefined
  if (macronized.length === 1) return macronized[0]
  else return macronized
}
