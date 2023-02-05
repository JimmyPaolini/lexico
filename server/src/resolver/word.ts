import { Arg, Query, Resolver } from 'type-graphql'
import { In } from 'typeorm'

import Word from '../entity/dictionary/Word'
import { dedupe } from '../services/array'
import { getWordForms } from '../services/forms'
import { Log } from '../services/log'
import { getClassicalPhonemes } from '../services/pronunciation/classical'
import { speech } from '../services/pronunciation/polly'
import {
  combineMacronizedOptions,
  normalize,
  textToTokens,
  textToWords,
} from '../services/string'

@Resolver(Word)
export class WordResolver {
  /**
   * Adds macrons to text where they are known, and adds umlauts wherever a macron is ambiguous
   * @param text macronized or unmacronized
   * @returns text with macrons (and umlauts)
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
   * Converts text to phonemes which are ready to be spoken
   * @param text macronized
   * @returns phonemes
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

  /**
   *
   * @param text macronized
   * @returns raw audio data, mp3 format and base64 encoded
   */
  @Query(() => String)
  @Log({ logResult: false })
  async speech(@Arg('text') text: string): Promise<string> {
    const phonemes = await this.phonemes(text)
    return await speech(phonemes)
  }
}
