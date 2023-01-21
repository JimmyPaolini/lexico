import { Arg, Query, Resolver } from 'type-graphql'
import { In } from 'typeorm'

import Word from '../entity/dictionary/Word'
import { dedupe } from '../services/array'
import { getWordForms } from '../services/forms'
import { Log } from '../services/log'
import { getClassicalPhonemes } from '../services/pronunciation/classical'
import { speak } from '../services/pronunciation/polly'
import {
  combineMacronizedOptions,
  i2j,
  normalize,
  textToTokens,
  textToWords,
  u2v,
} from '../services/string'

@Resolver(Word)
export class WordResolver {
  /**
   *
   * @param text macronized or unmacronized
   * @returns text with macrons, and umlauts wherever a macron is ambiguous
   */
  @Query(() => String)
  @Log()
  async macronize(@Arg('text') text: string): Promise<string> {
    if (text.length > 2500)
      throw new Error('text must be under 2500 characters')
    text = normalize(text)
    const tokens = text.match(/\w+|\W+/gim)
    const normalizedWords = textToWords(text)

    const words = await Word.find({ where: { word: In(normalizedWords) } })

    return (
      tokens?.map((token) => {
        const word = words.find((word) => word.word === token)
        if (word) {
          const macronizedOptions = dedupe(
            word.entries.flatMap((entry) =>
              entry.forms ? getWordForms(token, entry.forms as object) : [token]
            )
          )
          if (!macronizedOptions.length) return token
          return combineMacronizedOptions(macronizedOptions)
        } else return token
      }) ?? []
    ).join('')
  }

  /**
   *
   * @param text macronized text
   * @returns text with words replaced by phonemes, ready to be spoken
   */
  @Query(() => String)
  @Log()
  async phonemes(@Arg('text') text: string): Promise<string> {
    const tokens = textToTokens(text)
    return (
      tokens?.map((token) => {
        if (token.match(/\w+/gim)) {
          return getClassicalPhonemes(token).replaceAll(' ', '')
        } else return token
      }) ?? []
    ).join('')
  }

  @Query(() => String)
  @Log({ logResult: false })
  async speak(@Arg('text') text: string): Promise<string> {
    const phonemes = await this.phonemes(text)
    return await speak(phonemes)
  }

  @Query(() => String)
  @Log()
  demacronize(@Arg('text') text: string) {
    return normalize(text)
  }

  @Query(() => String)
  @Log()
  async u2v(@Arg('text') text: string): Promise<string> {
    return u2v(text)
  }

  @Query(() => String)
  @Log()
  async i2j(@Arg('text') text: string): Promise<string> {
    return i2j(text)
  }

  @Query(() => String)
  @Log()
  async capitalize(@Arg('text') text: string): Promise<string> {
    return text.toUpperCase()
  }
}
