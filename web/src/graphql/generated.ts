/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { clientEndpoint as endpointUrl } from "../pages/_app"

import gql from "graphql-tag"
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpointUrl as string, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query, variables }),
    })

    const json = await res.json()

    if (json.errors) {
      const { message } = json.errors[0]

      throw new Error(message)
    }

    return json.data
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type AdjectiveCase = {
  ablative?: Maybe<AdjectiveNumber>
  accusative?: Maybe<AdjectiveNumber>
  dative?: Maybe<AdjectiveNumber>
  genitive?: Maybe<AdjectiveNumber>
  locative?: Maybe<AdjectiveNumber>
  nominative?: Maybe<AdjectiveNumber>
  vocative?: Maybe<AdjectiveNumber>
}

export type AdjectiveForms = {
  feminine?: Maybe<AdjectiveCase>
  masculine?: Maybe<AdjectiveCase>
  neuter?: Maybe<AdjectiveCase>
}

export type AdjectiveInflection = {
  declension: Scalars["String"]
  degree: Scalars["String"]
  other: Scalars["String"]
}

export type AdjectiveNumber = {
  plural?: Maybe<Array<Scalars["String"]>>
  singular?: Maybe<Array<Scalars["String"]>>
}

export type AdverbForms = {
  comparative?: Maybe<Array<Scalars["String"]>>
  positive?: Maybe<Array<Scalars["String"]>>
  superlative?: Maybe<Array<Scalars["String"]>>
}

export type AdverbInflection = {
  degree: Scalars["String"]
  type: Scalars["String"]
}

export type Author = {
  books?: Maybe<Array<Book>>
  id: Scalars["String"]
  name: Scalars["String"]
  texts: Array<Text>
}

export type Book = {
  author: Author
  id: Scalars["ID"]
  texts: Array<Text>
  title: Scalars["String"]
}

export type CustomText = {
  id: Scalars["ID"]
  text: Scalars["String"]
  title: Scalars["String"]
  user: User
}

export type Entry = {
  bookmarked?: Maybe<Scalars["Boolean"]>
  etymology?: Maybe<Scalars["String"]>
  forms?: Maybe<Forms>
  id: Scalars["ID"]
  identifiers?: Maybe<Array<Scalars["String"]>>
  inflection?: Maybe<Inflection>
  partOfSpeech: Scalars["String"]
  principalParts?: Maybe<Array<PrincipalPart>>
  pronunciation?: Maybe<Pronunciation>
  translations?: Maybe<Array<Translation>>
  users?: Maybe<Array<User>>
  words: Array<Word>
}

export type Forms = AdjectiveForms | AdverbForms | NounForms | VerbForms

export type Gerund = {
  ablative?: Maybe<Array<Scalars["String"]>>
  accusative?: Maybe<Array<Scalars["String"]>>
  dative?: Maybe<Array<Scalars["String"]>>
  genitive?: Maybe<Array<Scalars["String"]>>
}

export type Imperative = {
  active?: Maybe<ImperativeActive>
  passive?: Maybe<ImperativePassive>
}

export type ImperativeActive = {
  future?: Maybe<ImperativeActiveFuture>
  present?: Maybe<ImperativePresent>
}

export type ImperativeActiveFuture = {
  plural?: Maybe<ImperativeSecondThird>
  singular?: Maybe<ImperativeSecondThird>
}

export type ImperativePassive = {
  future?: Maybe<ImperativePassiveFuture>
  present?: Maybe<ImperativePresent>
}

export type ImperativePassiveFuture = {
  plural?: Maybe<ImperativeThird>
  singular?: Maybe<ImperativeSecondThird>
}

export type ImperativePresent = {
  plural?: Maybe<ImperativeSecond>
  singular?: Maybe<ImperativeSecond>
}

export type ImperativeSecond = {
  second?: Maybe<Array<Scalars["String"]>>
}

export type ImperativeSecondThird = {
  second?: Maybe<Array<Scalars["String"]>>
  third?: Maybe<Array<Scalars["String"]>>
}

export type ImperativeThird = {
  third?: Maybe<Array<Scalars["String"]>>
}

export type Indicative = {
  active?: Maybe<IndicativeTense>
  passive?: Maybe<IndicativeTense>
}

export type IndicativeNumber = {
  plural?: Maybe<IndicativePerson>
  singular?: Maybe<IndicativePerson>
}

export type IndicativePerson = {
  first?: Maybe<Array<Scalars["String"]>>
  second?: Maybe<Array<Scalars["String"]>>
  third?: Maybe<Array<Scalars["String"]>>
}

export type IndicativeTense = {
  future?: Maybe<IndicativeNumber>
  futurePerfect?: Maybe<IndicativeNumber>
  imperfect?: Maybe<IndicativeNumber>
  perfect?: Maybe<IndicativeNumber>
  pluperfect?: Maybe<IndicativeNumber>
  present?: Maybe<IndicativeNumber>
}

export type Inflection =
  | AdjectiveInflection
  | AdverbInflection
  | NounInflection
  | PrepositionInflection
  | Uninflected
  | VerbInflection

export type Line = {
  id: Scalars["ID"]
  line: Scalars["String"]
  lineLabel: Scalars["String"]
  lineNumber: Scalars["Float"]
  text: Text
}

export type Mutation = {
  bookmark: Scalars["Boolean"]
  comment: Scalars["Boolean"]
  createCustomText: CustomText
  deleteCustomText: Scalars["Boolean"]
  recoverPassword: Scalars["Boolean"]
  register: User
  resetPassword: Scalars["Boolean"]
  setSettings: Scalars["Boolean"]
  unbookmark: Scalars["Boolean"]
  unregister: Scalars["Boolean"]
}

export type MutationBookmarkArgs = {
  entryId: Scalars["String"]
}

export type MutationCommentArgs = {
  comment: Scalars["String"]
}

export type MutationCreateCustomTextArgs = {
  id: Scalars["String"]
  text: Scalars["String"]
  title: Scalars["String"]
}

export type MutationDeleteCustomTextArgs = {
  id: Scalars["String"]
}

export type MutationRecoverPasswordArgs = {
  email: Scalars["String"]
}

export type MutationRegisterArgs = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type MutationResetPasswordArgs = {
  password: Scalars["String"]
  passwordResetToken: Scalars["String"]
}

export type MutationSetSettingsArgs = {
  settings: SettingsInput
}

export type MutationUnbookmarkArgs = {
  entryId: Scalars["String"]
}

export type NonFinite = {
  infinitive?: Maybe<NonFiniteInfinitive>
  participle?: Maybe<NonFiniteParticiple>
}

export type NonFiniteInfinitive = {
  active?: Maybe<NonFinitePresentPerfectFuture>
  passive?: Maybe<NonFinitePresentPerfectFuture>
}

export type NonFiniteParticiple = {
  active?: Maybe<NonFinitePresentFuture>
  passive?: Maybe<NonFinitePerfectFuture>
}

export type NonFinitePerfectFuture = {
  future?: Maybe<Array<Scalars["String"]>>
  perfect?: Maybe<Array<Scalars["String"]>>
}

export type NonFinitePresentFuture = {
  future?: Maybe<Array<Scalars["String"]>>
  present?: Maybe<Array<Scalars["String"]>>
}

export type NonFinitePresentPerfectFuture = {
  future?: Maybe<Array<Scalars["String"]>>
  perfect?: Maybe<Array<Scalars["String"]>>
  present?: Maybe<Array<Scalars["String"]>>
}

export type NounForms = {
  ablative?: Maybe<NounNumber>
  accusative?: Maybe<NounNumber>
  dative?: Maybe<NounNumber>
  genitive?: Maybe<NounNumber>
  locative?: Maybe<NounNumber>
  nominative?: Maybe<NounNumber>
  vocative?: Maybe<NounNumber>
}

export type NounInflection = {
  declension: Scalars["String"]
  gender: Scalars["String"]
  other: Scalars["String"]
}

export type NounNumber = {
  plural?: Maybe<Array<Scalars["String"]>>
  singular?: Maybe<Array<Scalars["String"]>>
}

export type PrepositionInflection = {
  case: Scalars["String"]
  other: Scalars["String"]
}

export type PrincipalPart = {
  name: Scalars["String"]
  text: Array<Scalars["String"]>
}

export type Pronunciation = {
  classical: PronunciationParts
  ecclesiastical: PronunciationParts
  vulgar: PronunciationParts
}

export type PronunciationParts = {
  phonemes: Scalars["String"]
  phonemic: Scalars["String"]
  phonetic: Scalars["String"]
}

export type Query = {
  bookmarks: Array<Entry>
  entries: Array<Entry>
  entry: Entry
  facebook: User
  findText: Text
  getAuthor: Author
  getAuthors: Array<Author>
  getBook: Book
  getBooks: Array<Book>
  getCustomText: CustomText
  getText: Text
  getTextIds: Array<Text>
  getTexts: Array<Text>
  google: User
  listCustomTexts: Array<CustomText>
  login: User
  logout: Scalars["Boolean"]
  searchAuthors: Array<Author>
  searchBooks: Array<Book>
  searchEnglish: Array<Entry>
  searchLatin: Array<Entry>
  searchLines: Array<Line>
  searchLiterature: Array<Author>
  searchTexts: Array<Text>
  settings: Settings
  user?: Maybe<User>
  users: Array<User>
  validatePasswordResetToken: Scalars["Boolean"]
}

export type QueryEntriesArgs = {
  ids: Array<Scalars["String"]>
}

export type QueryEntryArgs = {
  id: Scalars["String"]
}

export type QueryFacebookArgs = {
  code: Scalars["String"]
}

export type QueryFindTextArgs = {
  author: Scalars["String"]
  book?: Maybe<Scalars["String"]>
  title: Scalars["String"]
}

export type QueryGetAuthorArgs = {
  id: Scalars["String"]
}

export type QueryGetBookArgs = {
  id: Scalars["String"]
}

export type QueryGetCustomTextArgs = {
  id: Scalars["String"]
}

export type QueryGetTextArgs = {
  id: Scalars["String"]
}

export type QueryGoogleArgs = {
  code: Scalars["String"]
}

export type QueryLoginArgs = {
  email: Scalars["String"]
  password: Scalars["String"]
}

export type QuerySearchAuthorsArgs = {
  search: Scalars["String"]
}

export type QuerySearchBooksArgs = {
  search: Scalars["String"]
}

export type QuerySearchEnglishArgs = {
  search: Scalars["String"]
}

export type QuerySearchLatinArgs = {
  search: Scalars["String"]
}

export type QuerySearchLinesArgs = {
  search: Scalars["String"]
}

export type QuerySearchLiteratureArgs = {
  search: Scalars["String"]
}

export type QuerySearchTextsArgs = {
  search: Scalars["String"]
}

export type QueryValidatePasswordResetTokenArgs = {
  passwordResetToken: Scalars["String"]
}

export type Settings = {
  dictionaryMacronized?: Maybe<Scalars["Boolean"]>
  fontSize?: Maybe<Scalars["Float"]>
  formsExpandedDefault?: Maybe<Scalars["Boolean"]>
  literatureMacronized?: Maybe<Scalars["Boolean"]>
  theme?: Maybe<Scalars["String"]>
  translationsExpandedDefault?: Maybe<Scalars["Boolean"]>
}

export type SettingsInput = {
  dictionaryMacronized?: Maybe<Scalars["Boolean"]>
  fontSize?: Maybe<Scalars["Float"]>
  formsExpandedDefault?: Maybe<Scalars["Boolean"]>
  literatureMacronized?: Maybe<Scalars["Boolean"]>
  theme?: Maybe<Scalars["String"]>
  translationsExpandedDefault?: Maybe<Scalars["Boolean"]>
}

export type Subjunctive = {
  active?: Maybe<SubjunctiveTense>
  passive?: Maybe<SubjunctiveTense>
}

export type SubjunctiveNumber = {
  plural?: Maybe<SubjunctivePerson>
  singular?: Maybe<SubjunctivePerson>
}

export type SubjunctivePerson = {
  first?: Maybe<Array<Scalars["String"]>>
  second?: Maybe<Array<Scalars["String"]>>
  third?: Maybe<Array<Scalars["String"]>>
}

export type SubjunctiveTense = {
  imperfect?: Maybe<SubjunctiveNumber>
  perfect?: Maybe<SubjunctiveNumber>
  pluperfect?: Maybe<SubjunctiveNumber>
  present?: Maybe<SubjunctiveNumber>
}

export type Supine = {
  ablative?: Maybe<Array<Scalars["String"]>>
  accusative?: Maybe<Array<Scalars["String"]>>
}

export type Text = {
  author: Author
  book?: Maybe<Book>
  id: Scalars["ID"]
  lines: Array<Line>
  linesSlice?: Maybe<Array<Line>>
  title: Scalars["String"]
}

export type TextLinesSliceArgs = {
  end?: Maybe<Scalars["Float"]>
  start?: Maybe<Scalars["Float"]>
}

export type Translation = {
  entry: Entry
  id: Scalars["ID"]
  translation: Scalars["String"]
}

export type Uninflected = {
  other: Scalars["String"]
}

export type User = {
  bookmarks?: Maybe<Array<Entry>>
  createdAt: Scalars["DateTime"]
  customTexts?: Maybe<Array<CustomText>>
  email: Scalars["String"]
  facebookId?: Maybe<Scalars["String"]>
  googleId?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  settings?: Maybe<Settings>
  updatedAt: Scalars["DateTime"]
}

export type VerbForms = {
  imperative?: Maybe<Imperative>
  indicative?: Maybe<Indicative>
  nonFinite?: Maybe<NonFinite>
  subjunctive?: Maybe<Subjunctive>
  verbalNoun?: Maybe<VerbalNoun>
}

export type VerbInflection = {
  conjugation: Scalars["String"]
  other: Scalars["String"]
}

export type VerbalNoun = {
  gerund?: Maybe<Gerund>
  supine?: Maybe<Supine>
}

export type Word = {
  entries: Array<Entry>
  word: Scalars["String"]
}

export type CommentMutationVariables = Exact<{
  comment: Scalars["String"]
}>

export type CommentMutation = { comment: boolean }

export type BookmarkMutationVariables = Exact<{
  entryId: Scalars["String"]
}>

export type BookmarkMutation = { bookmark: boolean }

export type BookmarksQueryVariables = Exact<{ [key: string]: never }>

export type BookmarksQuery = {
  bookmarks: Array<{
    id: string
    partOfSpeech: string
    identifiers?: Maybe<Array<string>>
    bookmarked?: Maybe<boolean>
    principalParts?: Maybe<Array<{ name: string; text: Array<string> }>>
    inflection?: Maybe<
      | { declension: string; degree: string; other: string }
      | { type: string; degree: string }
      | { declension: string; gender: string; other: string }
      | { case: string; other: string }
      | { other: string }
      | { conjugation: string; other: string }
    >
    translations?: Maybe<Array<{ id: string; translation: string }>>
    forms?: Maybe<
      | {
          masculine?: Maybe<{
            nominative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            genitive?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            dative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            accusative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            ablative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            vocative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            locative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
          }>
          feminine?: Maybe<{
            nominative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            genitive?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            dative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            accusative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            ablative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            vocative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            locative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
          }>
          neuter?: Maybe<{
            nominative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            genitive?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            dative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            accusative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            ablative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            vocative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            locative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
          }>
        }
      | {
          positive?: Maybe<Array<string>>
          comparative?: Maybe<Array<string>>
          superlative?: Maybe<Array<string>>
        }
      | {
          nominative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          genitive?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          dative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          accusative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          ablative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          vocative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          locative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
        }
      | {
          indicative?: Maybe<{
            active?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              futurePerfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
            passive?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              futurePerfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
          }>
          subjunctive?: Maybe<{
            active?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
            passive?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
          }>
          imperative?: Maybe<{
            active?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{ second?: Maybe<Array<string>> }>
                plural?: Maybe<{ second?: Maybe<Array<string>> }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
            passive?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{ second?: Maybe<Array<string>> }>
                plural?: Maybe<{ second?: Maybe<Array<string>> }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{ third?: Maybe<Array<string>> }>
              }>
            }>
          }>
          nonFinite?: Maybe<{
            infinitive?: Maybe<{
              active?: Maybe<{
                present?: Maybe<Array<string>>
                perfect?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
              passive?: Maybe<{
                present?: Maybe<Array<string>>
                perfect?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
            }>
            participle?: Maybe<{
              active?: Maybe<{
                present?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
              passive?: Maybe<{
                perfect?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
            }>
          }>
          verbalNoun?: Maybe<{
            gerund?: Maybe<{
              genitive?: Maybe<Array<string>>
              dative?: Maybe<Array<string>>
              accusative?: Maybe<Array<string>>
              ablative?: Maybe<Array<string>>
            }>
            supine?: Maybe<{
              accusative?: Maybe<Array<string>>
              ablative?: Maybe<Array<string>>
            }>
          }>
        }
    >
  }>
}

export type EntriesQueryVariables = Exact<{
  ids: Array<Scalars["String"]> | Scalars["String"]
}>

export type EntriesQuery = {
  entries: Array<{
    id: string
    partOfSpeech: string
    identifiers?: Maybe<Array<string>>
    bookmarked?: Maybe<boolean>
    principalParts?: Maybe<Array<{ name: string; text: Array<string> }>>
    inflection?: Maybe<
      | { declension: string; degree: string; other: string }
      | { type: string; degree: string }
      | { declension: string; gender: string; other: string }
      | { case: string; other: string }
      | { other: string }
      | { conjugation: string; other: string }
    >
    translations?: Maybe<Array<{ id: string; translation: string }>>
    forms?: Maybe<
      | {
          masculine?: Maybe<{
            nominative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            genitive?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            dative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            accusative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            ablative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            vocative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            locative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
          }>
          feminine?: Maybe<{
            nominative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            genitive?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            dative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            accusative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            ablative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            vocative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            locative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
          }>
          neuter?: Maybe<{
            nominative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            genitive?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            dative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            accusative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            ablative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            vocative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            locative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
          }>
        }
      | {
          positive?: Maybe<Array<string>>
          comparative?: Maybe<Array<string>>
          superlative?: Maybe<Array<string>>
        }
      | {
          nominative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          genitive?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          dative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          accusative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          ablative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          vocative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          locative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
        }
      | {
          indicative?: Maybe<{
            active?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              futurePerfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
            passive?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              futurePerfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
          }>
          subjunctive?: Maybe<{
            active?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
            passive?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
          }>
          imperative?: Maybe<{
            active?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{ second?: Maybe<Array<string>> }>
                plural?: Maybe<{ second?: Maybe<Array<string>> }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
            passive?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{ second?: Maybe<Array<string>> }>
                plural?: Maybe<{ second?: Maybe<Array<string>> }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{ third?: Maybe<Array<string>> }>
              }>
            }>
          }>
          nonFinite?: Maybe<{
            infinitive?: Maybe<{
              active?: Maybe<{
                present?: Maybe<Array<string>>
                perfect?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
              passive?: Maybe<{
                present?: Maybe<Array<string>>
                perfect?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
            }>
            participle?: Maybe<{
              active?: Maybe<{
                present?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
              passive?: Maybe<{
                perfect?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
            }>
          }>
          verbalNoun?: Maybe<{
            gerund?: Maybe<{
              genitive?: Maybe<Array<string>>
              dative?: Maybe<Array<string>>
              accusative?: Maybe<Array<string>>
              ablative?: Maybe<Array<string>>
            }>
            supine?: Maybe<{
              accusative?: Maybe<Array<string>>
              ablative?: Maybe<Array<string>>
            }>
          }>
        }
    >
  }>
}

export type UnbookmarkMutationVariables = Exact<{
  entryId: Scalars["String"]
}>

export type UnbookmarkMutation = { unbookmark: boolean }

export type CreateCustomTextMutationVariables = Exact<{
  id: Scalars["String"]
  title: Scalars["String"]
  text: Scalars["String"]
}>

export type CreateCustomTextMutation = {
  createCustomText: { id: string; title: string; text: string }
}

export type DeleteCustomTextMutationVariables = Exact<{
  id: Scalars["String"]
}>

export type DeleteCustomTextMutation = { deleteCustomText: boolean }

export type GetCustomTextQueryVariables = Exact<{
  id: Scalars["String"]
}>

export type GetCustomTextQuery = {
  getCustomText: { id: string; title: string; text: string }
}

export type ListCustomTextsQueryVariables = Exact<{ [key: string]: never }>

export type ListCustomTextsQuery = {
  listCustomTexts: Array<{ id: string; title: string; text: string }>
}

export type FindTextQueryVariables = Exact<{
  author: Scalars["String"]
  book?: Maybe<Scalars["String"]>
  title: Scalars["String"]
}>

export type FindTextQuery = {
  findText: {
    id: string
    title: string
    lines: Array<{
      id: string
      line: string
      lineNumber: number
      lineLabel: string
    }>
    book?: Maybe<{ id: string; title: string }>
    author: { id: string; name: string }
  }
}

export type GetAuthorsQueryVariables = Exact<{ [key: string]: never }>

export type GetAuthorsQuery = {
  getAuthors: Array<{
    id: string
    name: string
    books?: Maybe<
      Array<{
        id: string
        title: string
        texts: Array<{ id: string; title: string }>
      }>
    >
    texts: Array<{ id: string; title: string }>
  }>
}

export type GetTextQueryVariables = Exact<{
  id: Scalars["String"]
}>

export type GetTextQuery = {
  getText: {
    id: string
    title: string
    lines: Array<{
      id: string
      line: string
      lineNumber: number
      lineLabel: string
    }>
    book?: Maybe<{ id: string; title: string }>
    author: { id: string; name: string }
  }
}

export type GetTextIdsQueryVariables = Exact<{ [key: string]: never }>

export type GetTextIdsQuery = { getTextIds: Array<{ id: string }> }

export type GetTextsQueryVariables = Exact<{ [key: string]: never }>

export type GetTextsQuery = {
  getTexts: Array<{
    id: string
    title: string
    author: { name: string }
    book?: Maybe<{ id: string; title: string }>
  }>
}

export type SearchEnglishQueryVariables = Exact<{
  search: Scalars["String"]
}>

export type SearchEnglishQuery = {
  searchEnglish: Array<{
    id: string
    partOfSpeech: string
    identifiers?: Maybe<Array<string>>
    bookmarked?: Maybe<boolean>
    principalParts?: Maybe<Array<{ name: string; text: Array<string> }>>
    inflection?: Maybe<
      | { declension: string; degree: string; other: string }
      | { type: string; degree: string }
      | { declension: string; gender: string; other: string }
      | { case: string; other: string }
      | { other: string }
      | { conjugation: string; other: string }
    >
    translations?: Maybe<Array<{ id: string; translation: string }>>
    forms?: Maybe<
      | {
          masculine?: Maybe<{
            nominative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            genitive?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            dative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            accusative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            ablative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            vocative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            locative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
          }>
          feminine?: Maybe<{
            nominative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            genitive?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            dative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            accusative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            ablative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            vocative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            locative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
          }>
          neuter?: Maybe<{
            nominative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            genitive?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            dative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            accusative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            ablative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            vocative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            locative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
          }>
        }
      | {
          positive?: Maybe<Array<string>>
          comparative?: Maybe<Array<string>>
          superlative?: Maybe<Array<string>>
        }
      | {
          nominative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          genitive?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          dative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          accusative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          ablative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          vocative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          locative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
        }
      | {
          indicative?: Maybe<{
            active?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              futurePerfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
            passive?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              futurePerfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
          }>
          subjunctive?: Maybe<{
            active?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
            passive?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
          }>
          imperative?: Maybe<{
            active?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{ second?: Maybe<Array<string>> }>
                plural?: Maybe<{ second?: Maybe<Array<string>> }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
            passive?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{ second?: Maybe<Array<string>> }>
                plural?: Maybe<{ second?: Maybe<Array<string>> }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{ third?: Maybe<Array<string>> }>
              }>
            }>
          }>
          nonFinite?: Maybe<{
            infinitive?: Maybe<{
              active?: Maybe<{
                present?: Maybe<Array<string>>
                perfect?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
              passive?: Maybe<{
                present?: Maybe<Array<string>>
                perfect?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
            }>
            participle?: Maybe<{
              active?: Maybe<{
                present?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
              passive?: Maybe<{
                perfect?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
            }>
          }>
          verbalNoun?: Maybe<{
            gerund?: Maybe<{
              genitive?: Maybe<Array<string>>
              dative?: Maybe<Array<string>>
              accusative?: Maybe<Array<string>>
              ablative?: Maybe<Array<string>>
            }>
            supine?: Maybe<{
              accusative?: Maybe<Array<string>>
              ablative?: Maybe<Array<string>>
            }>
          }>
        }
    >
  }>
}

export type SearchLatinQueryVariables = Exact<{
  search: Scalars["String"]
}>

export type SearchLatinQuery = {
  searchLatin: Array<{
    id: string
    partOfSpeech: string
    identifiers?: Maybe<Array<string>>
    bookmarked?: Maybe<boolean>
    principalParts?: Maybe<Array<{ name: string; text: Array<string> }>>
    inflection?: Maybe<
      | { declension: string; degree: string; other: string }
      | { type: string; degree: string }
      | { declension: string; gender: string; other: string }
      | { case: string; other: string }
      | { other: string }
      | { conjugation: string; other: string }
    >
    translations?: Maybe<Array<{ id: string; translation: string }>>
    forms?: Maybe<
      | {
          masculine?: Maybe<{
            nominative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            genitive?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            dative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            accusative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            ablative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            vocative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            locative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
          }>
          feminine?: Maybe<{
            nominative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            genitive?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            dative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            accusative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            ablative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            vocative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            locative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
          }>
          neuter?: Maybe<{
            nominative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            genitive?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            dative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            accusative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            ablative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            vocative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
            locative?: Maybe<{
              singular?: Maybe<Array<string>>
              plural?: Maybe<Array<string>>
            }>
          }>
        }
      | {
          positive?: Maybe<Array<string>>
          comparative?: Maybe<Array<string>>
          superlative?: Maybe<Array<string>>
        }
      | {
          nominative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          genitive?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          dative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          accusative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          ablative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          vocative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
          locative?: Maybe<{
            singular?: Maybe<Array<string>>
            plural?: Maybe<Array<string>>
          }>
        }
      | {
          indicative?: Maybe<{
            active?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              futurePerfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
            passive?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              futurePerfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
          }>
          subjunctive?: Maybe<{
            active?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
            passive?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              imperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              perfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
              pluperfect?: Maybe<{
                singular?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  first?: Maybe<Array<string>>
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
          }>
          imperative?: Maybe<{
            active?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{ second?: Maybe<Array<string>> }>
                plural?: Maybe<{ second?: Maybe<Array<string>> }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
              }>
            }>
            passive?: Maybe<{
              present?: Maybe<{
                singular?: Maybe<{ second?: Maybe<Array<string>> }>
                plural?: Maybe<{ second?: Maybe<Array<string>> }>
              }>
              future?: Maybe<{
                singular?: Maybe<{
                  second?: Maybe<Array<string>>
                  third?: Maybe<Array<string>>
                }>
                plural?: Maybe<{ third?: Maybe<Array<string>> }>
              }>
            }>
          }>
          nonFinite?: Maybe<{
            infinitive?: Maybe<{
              active?: Maybe<{
                present?: Maybe<Array<string>>
                perfect?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
              passive?: Maybe<{
                present?: Maybe<Array<string>>
                perfect?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
            }>
            participle?: Maybe<{
              active?: Maybe<{
                present?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
              passive?: Maybe<{
                perfect?: Maybe<Array<string>>
                future?: Maybe<Array<string>>
              }>
            }>
          }>
          verbalNoun?: Maybe<{
            gerund?: Maybe<{
              genitive?: Maybe<Array<string>>
              dative?: Maybe<Array<string>>
              accusative?: Maybe<Array<string>>
              ablative?: Maybe<Array<string>>
            }>
            supine?: Maybe<{
              accusative?: Maybe<Array<string>>
              ablative?: Maybe<Array<string>>
            }>
          }>
        }
    >
  }>
}

export type FacebookQueryVariables = Exact<{
  code: Scalars["String"]
}>

export type FacebookQuery = {
  facebook: { id: string; email: string; facebookId?: Maybe<string> }
}

export type GoogleQueryVariables = Exact<{
  code: Scalars["String"]
}>

export type GoogleQuery = {
  google: { id: string; email: string; googleId?: Maybe<string> }
}

export type LoginQueryVariables = Exact<{
  email: Scalars["String"]
  password: Scalars["String"]
}>

export type LoginQuery = { login: { id: string; email: string } }

export type LogoutQueryVariables = Exact<{ [key: string]: never }>

export type LogoutQuery = { logout: boolean }

export type RecoverPasswordMutationVariables = Exact<{
  email: Scalars["String"]
}>

export type RecoverPasswordMutation = { recoverPassword: boolean }

export type RegisterMutationVariables = Exact<{
  email: Scalars["String"]
  password: Scalars["String"]
}>

export type RegisterMutation = { register: { id: string; email: string } }

export type ResetPasswordMutationVariables = Exact<{
  passwordResetToken: Scalars["String"]
  password: Scalars["String"]
}>

export type ResetPasswordMutation = { resetPassword: boolean }

export type UnregisterMutationVariables = Exact<{ [key: string]: never }>

export type UnregisterMutation = { unregister: boolean }

export type UserQueryVariables = Exact<{ [key: string]: never }>

export type UserQuery = {
  user?: Maybe<{
    id: string
    email: string
    googleId?: Maybe<string>
    facebookId?: Maybe<string>
    settings?: Maybe<{
      theme?: Maybe<string>
      fontSize?: Maybe<number>
      formsExpandedDefault?: Maybe<boolean>
      translationsExpandedDefault?: Maybe<boolean>
      dictionaryMacronized?: Maybe<boolean>
      literatureMacronized?: Maybe<boolean>
    }>
  }>
}

export type ValidatePasswordResetTokenQueryVariables = Exact<{
  passwordResetToken: Scalars["String"]
}>

export type ValidatePasswordResetTokenQuery = {
  validatePasswordResetToken: boolean
}

export type SetSettingsMutationVariables = Exact<{
  settings: SettingsInput
}>

export type SetSettingsMutation = { setSettings: boolean }

export const AllPrincipalParts = gql`
  fragment allPrincipalParts on PrincipalPart {
    name
    text
  }
`
export const AllNounInflections = gql`
  fragment allNounInflections on NounInflection {
    declension
    gender
    other
  }
`
export const AllVerbInflections = gql`
  fragment allVerbInflections on VerbInflection {
    conjugation
    other
  }
`
export const AllAdjectiveInflections = gql`
  fragment allAdjectiveInflections on AdjectiveInflection {
    declension
    degree
    other
  }
`
export const AllAdverbInflections = gql`
  fragment allAdverbInflections on AdverbInflection {
    type
    degree
  }
`
export const AllPrepositionInflections = gql`
  fragment allPrepositionInflections on PrepositionInflection {
    case
    other
  }
`
export const AllUninflected = gql`
  fragment allUninflected on Uninflected {
    other
  }
`
export const AllInflections = gql`
  fragment allInflections on Inflection {
    ... on NounInflection {
      ...allNounInflections
    }
    ... on VerbInflection {
      ...allVerbInflections
    }
    ... on AdjectiveInflection {
      ...allAdjectiveInflections
    }
    ... on AdverbInflection {
      ...allAdverbInflections
    }
    ... on PrepositionInflection {
      ...allPrepositionInflections
    }
    ... on Uninflected {
      ...allUninflected
    }
  }
  ${AllNounInflections}
  ${AllVerbInflections}
  ${AllAdjectiveInflections}
  ${AllAdverbInflections}
  ${AllPrepositionInflections}
  ${AllUninflected}
`
export const AllTranslations = gql`
  fragment allTranslations on Translation {
    id
    translation
  }
`
export const AllNounNumbers = gql`
  fragment allNounNumbers on NounNumber {
    singular
    plural
  }
`
export const AllNounForms = gql`
  fragment allNounForms on NounForms {
    nominative {
      ...allNounNumbers
    }
    genitive {
      ...allNounNumbers
    }
    dative {
      ...allNounNumbers
    }
    accusative {
      ...allNounNumbers
    }
    ablative {
      ...allNounNumbers
    }
    vocative {
      ...allNounNumbers
    }
    locative {
      ...allNounNumbers
    }
  }
  ${AllNounNumbers}
`
export const AllIndicativePerson = gql`
  fragment allIndicativePerson on IndicativePerson {
    first
    second
    third
  }
`
export const AllIndicativeNumber = gql`
  fragment allIndicativeNumber on IndicativeNumber {
    singular {
      ...allIndicativePerson
    }
    plural {
      ...allIndicativePerson
    }
  }
  ${AllIndicativePerson}
`
export const AllIndicativeTense = gql`
  fragment allIndicativeTense on IndicativeTense {
    present {
      ...allIndicativeNumber
    }
    imperfect {
      ...allIndicativeNumber
    }
    future {
      ...allIndicativeNumber
    }
    perfect {
      ...allIndicativeNumber
    }
    pluperfect {
      ...allIndicativeNumber
    }
    futurePerfect {
      ...allIndicativeNumber
    }
  }
  ${AllIndicativeNumber}
`
export const AllIndicative = gql`
  fragment allIndicative on Indicative {
    active {
      ...allIndicativeTense
    }
    passive {
      ...allIndicativeTense
    }
  }
  ${AllIndicativeTense}
`
export const AllSubjunctivePerson = gql`
  fragment allSubjunctivePerson on SubjunctivePerson {
    first
    second
    third
  }
`
export const AllSubjunctiveNumber = gql`
  fragment allSubjunctiveNumber on SubjunctiveNumber {
    singular {
      ...allSubjunctivePerson
    }
    plural {
      ...allSubjunctivePerson
    }
  }
  ${AllSubjunctivePerson}
`
export const AllSubjunctiveTense = gql`
  fragment allSubjunctiveTense on SubjunctiveTense {
    present {
      ...allSubjunctiveNumber
    }
    imperfect {
      ...allSubjunctiveNumber
    }
    perfect {
      ...allSubjunctiveNumber
    }
    pluperfect {
      ...allSubjunctiveNumber
    }
  }
  ${AllSubjunctiveNumber}
`
export const AllSubjunctive = gql`
  fragment allSubjunctive on Subjunctive {
    active {
      ...allSubjunctiveTense
    }
    passive {
      ...allSubjunctiveTense
    }
  }
  ${AllSubjunctiveTense}
`
export const AllImperativeSecond = gql`
  fragment allImperativeSecond on ImperativeSecond {
    second
  }
`
export const AllImperativePresent = gql`
  fragment allImperativePresent on ImperativePresent {
    singular {
      ...allImperativeSecond
    }
    plural {
      ...allImperativeSecond
    }
  }
  ${AllImperativeSecond}
`
export const AllImperativeSecondThird = gql`
  fragment allImperativeSecondThird on ImperativeSecondThird {
    second
    third
  }
`
export const AllImperativeActiveFuture = gql`
  fragment allImperativeActiveFuture on ImperativeActiveFuture {
    singular {
      ...allImperativeSecondThird
    }
    plural {
      ...allImperativeSecondThird
    }
  }
  ${AllImperativeSecondThird}
`
export const AllImperativeActive = gql`
  fragment allImperativeActive on ImperativeActive {
    present {
      ...allImperativePresent
    }
    future {
      ...allImperativeActiveFuture
    }
  }
  ${AllImperativePresent}
  ${AllImperativeActiveFuture}
`
export const AllImperativeThird = gql`
  fragment allImperativeThird on ImperativeThird {
    third
  }
`
export const AllImperativePassiveFuture = gql`
  fragment allImperativePassiveFuture on ImperativePassiveFuture {
    singular {
      ...allImperativeSecondThird
    }
    plural {
      ...allImperativeThird
    }
  }
  ${AllImperativeSecondThird}
  ${AllImperativeThird}
`
export const AllImperativePassive = gql`
  fragment allImperativePassive on ImperativePassive {
    present {
      ...allImperativePresent
    }
    future {
      ...allImperativePassiveFuture
    }
  }
  ${AllImperativePresent}
  ${AllImperativePassiveFuture}
`
export const AllImperative = gql`
  fragment allImperative on Imperative {
    active {
      ...allImperativeActive
    }
    passive {
      ...allImperativePassive
    }
  }
  ${AllImperativeActive}
  ${AllImperativePassive}
`
export const AllNonFinitePresentPerfectFuture = gql`
  fragment allNonFinitePresentPerfectFuture on NonFinitePresentPerfectFuture {
    present
    perfect
    future
  }
`
export const AllNonFiniteInfinitive = gql`
  fragment allNonFiniteInfinitive on NonFiniteInfinitive {
    active {
      ...allNonFinitePresentPerfectFuture
    }
    passive {
      ...allNonFinitePresentPerfectFuture
    }
  }
  ${AllNonFinitePresentPerfectFuture}
`
export const AllNonFinitePresentFuture = gql`
  fragment allNonFinitePresentFuture on NonFinitePresentFuture {
    present
    future
  }
`
export const AllNonFinitePerfectFuture = gql`
  fragment allNonFinitePerfectFuture on NonFinitePerfectFuture {
    perfect
    future
  }
`
export const AllNonFiniteParticiple = gql`
  fragment allNonFiniteParticiple on NonFiniteParticiple {
    active {
      ...allNonFinitePresentFuture
    }
    passive {
      ...allNonFinitePerfectFuture
    }
  }
  ${AllNonFinitePresentFuture}
  ${AllNonFinitePerfectFuture}
`
export const AllNonFinite = gql`
  fragment allNonFinite on NonFinite {
    infinitive {
      ...allNonFiniteInfinitive
    }
    participle {
      ...allNonFiniteParticiple
    }
  }
  ${AllNonFiniteInfinitive}
  ${AllNonFiniteParticiple}
`
export const AllGerund = gql`
  fragment allGerund on Gerund {
    genitive
    dative
    accusative
    ablative
  }
`
export const AllSupine = gql`
  fragment allSupine on Supine {
    accusative
    ablative
  }
`
export const AllVerbalNoun = gql`
  fragment allVerbalNoun on VerbalNoun {
    gerund {
      ...allGerund
    }
    supine {
      ...allSupine
    }
  }
  ${AllGerund}
  ${AllSupine}
`
export const AllVerbForms = gql`
  fragment allVerbForms on VerbForms {
    indicative {
      ...allIndicative
    }
    subjunctive {
      ...allSubjunctive
    }
    imperative {
      ...allImperative
    }
    nonFinite {
      ...allNonFinite
    }
    verbalNoun {
      ...allVerbalNoun
    }
  }
  ${AllIndicative}
  ${AllSubjunctive}
  ${AllImperative}
  ${AllNonFinite}
  ${AllVerbalNoun}
`
export const AllAdjectiveNumber = gql`
  fragment allAdjectiveNumber on AdjectiveNumber {
    singular
    plural
  }
`
export const AllAdjectiveCase = gql`
  fragment allAdjectiveCase on AdjectiveCase {
    nominative {
      ...allAdjectiveNumber
    }
    genitive {
      ...allAdjectiveNumber
    }
    dative {
      ...allAdjectiveNumber
    }
    accusative {
      ...allAdjectiveNumber
    }
    ablative {
      ...allAdjectiveNumber
    }
    vocative {
      ...allAdjectiveNumber
    }
    locative {
      ...allAdjectiveNumber
    }
  }
  ${AllAdjectiveNumber}
`
export const AllAdjectiveForms = gql`
  fragment allAdjectiveForms on AdjectiveForms {
    masculine {
      ...allAdjectiveCase
    }
    feminine {
      ...allAdjectiveCase
    }
    neuter {
      ...allAdjectiveCase
    }
  }
  ${AllAdjectiveCase}
`
export const AllAdverbForms = gql`
  fragment allAdverbForms on AdverbForms {
    positive
    comparative
    superlative
  }
`
export const AllForms = gql`
  fragment allForms on Forms {
    ... on NounForms {
      ...allNounForms
    }
    ... on VerbForms {
      ...allVerbForms
    }
    ... on AdjectiveForms {
      ...allAdjectiveForms
    }
    ... on AdverbForms {
      ...allAdverbForms
    }
  }
  ${AllNounForms}
  ${AllVerbForms}
  ${AllAdjectiveForms}
  ${AllAdverbForms}
`
export const AllEntry = gql`
  fragment allEntry on Entry {
    id
    partOfSpeech
    principalParts {
      ...allPrincipalParts
    }
    inflection {
      ...allInflections
    }
    translations {
      ...allTranslations
    }
    forms {
      ...allForms
    }
    identifiers
    bookmarked
  }
  ${AllPrincipalParts}
  ${AllInflections}
  ${AllTranslations}
  ${AllForms}
`
export const AllSettings = gql`
  fragment allSettings on Settings {
    theme
    fontSize
    formsExpandedDefault
    translationsExpandedDefault
    dictionaryMacronized
    literatureMacronized
  }
`
export const Comment = gql`
  mutation comment($comment: String!) {
    comment(comment: $comment)
  }
`
export const Bookmark = gql`
  mutation Bookmark($entryId: String!) {
    bookmark(entryId: $entryId)
  }
`
export const Bookmarks = gql`
  query Bookmarks {
    bookmarks {
      ...allEntry
    }
  }
  ${AllEntry}
  ${AllPrincipalParts}
  ${AllInflections}
  ${AllNounInflections}
  ${AllVerbInflections}
  ${AllAdjectiveInflections}
  ${AllAdverbInflections}
  ${AllPrepositionInflections}
  ${AllUninflected}
  ${AllTranslations}
  ${AllForms}
  ${AllNounForms}
  ${AllNounNumbers}
  ${AllVerbForms}
  ${AllIndicative}
  ${AllIndicativeTense}
  ${AllIndicativeNumber}
  ${AllIndicativePerson}
  ${AllSubjunctive}
  ${AllSubjunctiveTense}
  ${AllSubjunctiveNumber}
  ${AllSubjunctivePerson}
  ${AllImperative}
  ${AllImperativeActive}
  ${AllImperativePresent}
  ${AllImperativeSecond}
  ${AllImperativeActiveFuture}
  ${AllImperativeSecondThird}
  ${AllImperativePassive}
  ${AllImperativePassiveFuture}
  ${AllImperativeThird}
  ${AllNonFinite}
  ${AllNonFiniteInfinitive}
  ${AllNonFinitePresentPerfectFuture}
  ${AllNonFiniteParticiple}
  ${AllNonFinitePresentFuture}
  ${AllNonFinitePerfectFuture}
  ${AllVerbalNoun}
  ${AllGerund}
  ${AllSupine}
  ${AllAdjectiveForms}
  ${AllAdjectiveCase}
  ${AllAdjectiveNumber}
  ${AllAdverbForms}
`
export const Entries = gql`
  query Entries($ids: [String!]!) {
    entries(ids: $ids) {
      ...allEntry
    }
  }
  ${AllEntry}
  ${AllPrincipalParts}
  ${AllInflections}
  ${AllNounInflections}
  ${AllVerbInflections}
  ${AllAdjectiveInflections}
  ${AllAdverbInflections}
  ${AllPrepositionInflections}
  ${AllUninflected}
  ${AllTranslations}
  ${AllForms}
  ${AllNounForms}
  ${AllNounNumbers}
  ${AllVerbForms}
  ${AllIndicative}
  ${AllIndicativeTense}
  ${AllIndicativeNumber}
  ${AllIndicativePerson}
  ${AllSubjunctive}
  ${AllSubjunctiveTense}
  ${AllSubjunctiveNumber}
  ${AllSubjunctivePerson}
  ${AllImperative}
  ${AllImperativeActive}
  ${AllImperativePresent}
  ${AllImperativeSecond}
  ${AllImperativeActiveFuture}
  ${AllImperativeSecondThird}
  ${AllImperativePassive}
  ${AllImperativePassiveFuture}
  ${AllImperativeThird}
  ${AllNonFinite}
  ${AllNonFiniteInfinitive}
  ${AllNonFinitePresentPerfectFuture}
  ${AllNonFiniteParticiple}
  ${AllNonFinitePresentFuture}
  ${AllNonFinitePerfectFuture}
  ${AllVerbalNoun}
  ${AllGerund}
  ${AllSupine}
  ${AllAdjectiveForms}
  ${AllAdjectiveCase}
  ${AllAdjectiveNumber}
  ${AllAdverbForms}
`
export const Unbookmark = gql`
  mutation Unbookmark($entryId: String!) {
    unbookmark(entryId: $entryId)
  }
`
export const CreateCustomText = gql`
  mutation CreateCustomText($id: String!, $title: String!, $text: String!) {
    createCustomText(id: $id, title: $title, text: $text) {
      id
      title
      text
    }
  }
`
export const DeleteCustomText = gql`
  mutation DeleteCustomText($id: String!) {
    deleteCustomText(id: $id)
  }
`
export const GetCustomText = gql`
  query GetCustomText($id: String!) {
    getCustomText(id: $id) {
      id
      title
      text
    }
  }
`
export const ListCustomTexts = gql`
  query ListCustomTexts {
    listCustomTexts {
      id
      title
      text
    }
  }
`
export const FindText = gql`
  query FindText($author: String!, $book: String, $title: String!) {
    findText(author: $author, book: $book, title: $title) {
      id
      title
      lines {
        id
        line
        lineNumber
        lineLabel
      }
      book {
        id
        title
      }
      author {
        id
        name
      }
    }
  }
`
export const GetAuthors = gql`
  query GetAuthors {
    getAuthors {
      id
      name
      books {
        id
        title
        texts {
          id
          title
        }
      }
      texts {
        id
        title
      }
    }
  }
`
export const GetText = gql`
  query GetText($id: String!) {
    getText(id: $id) {
      id
      title
      lines {
        id
        line
        lineNumber
        lineLabel
      }
      book {
        id
        title
      }
      author {
        id
        name
      }
    }
  }
`
export const GetTextIds = gql`
  query GetTextIds {
    getTextIds {
      id
    }
  }
`
export const GetTexts = gql`
  query GetTexts {
    getTexts {
      id
      title
      author {
        name
      }
      book {
        id
        title
      }
    }
  }
`
export const SearchEnglish = gql`
  query SearchEnglish($search: String!) {
    searchEnglish(search: $search) {
      ...allEntry
    }
  }
  ${AllEntry}
  ${AllPrincipalParts}
  ${AllInflections}
  ${AllNounInflections}
  ${AllVerbInflections}
  ${AllAdjectiveInflections}
  ${AllAdverbInflections}
  ${AllPrepositionInflections}
  ${AllUninflected}
  ${AllTranslations}
  ${AllForms}
  ${AllNounForms}
  ${AllNounNumbers}
  ${AllVerbForms}
  ${AllIndicative}
  ${AllIndicativeTense}
  ${AllIndicativeNumber}
  ${AllIndicativePerson}
  ${AllSubjunctive}
  ${AllSubjunctiveTense}
  ${AllSubjunctiveNumber}
  ${AllSubjunctivePerson}
  ${AllImperative}
  ${AllImperativeActive}
  ${AllImperativePresent}
  ${AllImperativeSecond}
  ${AllImperativeActiveFuture}
  ${AllImperativeSecondThird}
  ${AllImperativePassive}
  ${AllImperativePassiveFuture}
  ${AllImperativeThird}
  ${AllNonFinite}
  ${AllNonFiniteInfinitive}
  ${AllNonFinitePresentPerfectFuture}
  ${AllNonFiniteParticiple}
  ${AllNonFinitePresentFuture}
  ${AllNonFinitePerfectFuture}
  ${AllVerbalNoun}
  ${AllGerund}
  ${AllSupine}
  ${AllAdjectiveForms}
  ${AllAdjectiveCase}
  ${AllAdjectiveNumber}
  ${AllAdverbForms}
`
export const SearchLatin = gql`
  query SearchLatin($search: String!) {
    searchLatin(search: $search) {
      ...allEntry
    }
  }
  ${AllEntry}
  ${AllPrincipalParts}
  ${AllInflections}
  ${AllNounInflections}
  ${AllVerbInflections}
  ${AllAdjectiveInflections}
  ${AllAdverbInflections}
  ${AllPrepositionInflections}
  ${AllUninflected}
  ${AllTranslations}
  ${AllForms}
  ${AllNounForms}
  ${AllNounNumbers}
  ${AllVerbForms}
  ${AllIndicative}
  ${AllIndicativeTense}
  ${AllIndicativeNumber}
  ${AllIndicativePerson}
  ${AllSubjunctive}
  ${AllSubjunctiveTense}
  ${AllSubjunctiveNumber}
  ${AllSubjunctivePerson}
  ${AllImperative}
  ${AllImperativeActive}
  ${AllImperativePresent}
  ${AllImperativeSecond}
  ${AllImperativeActiveFuture}
  ${AllImperativeSecondThird}
  ${AllImperativePassive}
  ${AllImperativePassiveFuture}
  ${AllImperativeThird}
  ${AllNonFinite}
  ${AllNonFiniteInfinitive}
  ${AllNonFinitePresentPerfectFuture}
  ${AllNonFiniteParticiple}
  ${AllNonFinitePresentFuture}
  ${AllNonFinitePerfectFuture}
  ${AllVerbalNoun}
  ${AllGerund}
  ${AllSupine}
  ${AllAdjectiveForms}
  ${AllAdjectiveCase}
  ${AllAdjectiveNumber}
  ${AllAdverbForms}
`
export const Facebook = gql`
  query Facebook($code: String!) {
    facebook(code: $code) {
      id
      email
      facebookId
    }
  }
`
export const Google = gql`
  query Google($code: String!) {
    google(code: $code) {
      id
      email
      googleId
    }
  }
`
export const Login = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`
export const Logout = gql`
  query Logout {
    logout
  }
`
export const RecoverPassword = gql`
  mutation RecoverPassword($email: String!) {
    recoverPassword(email: $email)
  }
`
export const Register = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      id
      email
    }
  }
`
export const ResetPassword = gql`
  mutation ResetPassword($passwordResetToken: String!, $password: String!) {
    resetPassword(passwordResetToken: $passwordResetToken, password: $password)
  }
`
export const Unregister = gql`
  mutation Unregister {
    unregister
  }
`
export const User = gql`
  query User {
    user {
      id
      email
      googleId
      facebookId
      settings {
        ...allSettings
      }
    }
  }
  ${AllSettings}
`
export const ValidatePasswordResetToken = gql`
  query ValidatePasswordResetToken($passwordResetToken: String!) {
    validatePasswordResetToken(passwordResetToken: $passwordResetToken)
  }
`
export const SetSettings = gql`
  mutation SetSettings($settings: SettingsInput!) {
    setSettings(settings: $settings)
  }
`
export const AllPrincipalPartsFragmentDoc = `
    fragment allPrincipalParts on PrincipalPart {
  name
  text
}
    `
export const AllNounInflectionsFragmentDoc = `
    fragment allNounInflections on NounInflection {
  declension
  gender
  other
}
    `
export const AllVerbInflectionsFragmentDoc = `
    fragment allVerbInflections on VerbInflection {
  conjugation
  other
}
    `
export const AllAdjectiveInflectionsFragmentDoc = `
    fragment allAdjectiveInflections on AdjectiveInflection {
  declension
  degree
  other
}
    `
export const AllAdverbInflectionsFragmentDoc = `
    fragment allAdverbInflections on AdverbInflection {
  type
  degree
}
    `
export const AllPrepositionInflectionsFragmentDoc = `
    fragment allPrepositionInflections on PrepositionInflection {
  case
  other
}
    `
export const AllUninflectedFragmentDoc = `
    fragment allUninflected on Uninflected {
  other
}
    `
export const AllInflectionsFragmentDoc = `
    fragment allInflections on Inflection {
  ... on NounInflection {
    ...allNounInflections
  }
  ... on VerbInflection {
    ...allVerbInflections
  }
  ... on AdjectiveInflection {
    ...allAdjectiveInflections
  }
  ... on AdverbInflection {
    ...allAdverbInflections
  }
  ... on PrepositionInflection {
    ...allPrepositionInflections
  }
  ... on Uninflected {
    ...allUninflected
  }
}
    `
export const AllTranslationsFragmentDoc = `
    fragment allTranslations on Translation {
  id
  translation
}
    `
export const AllNounNumbersFragmentDoc = `
    fragment allNounNumbers on NounNumber {
  singular
  plural
}
    `
export const AllNounFormsFragmentDoc = `
    fragment allNounForms on NounForms {
  nominative {
    ...allNounNumbers
  }
  genitive {
    ...allNounNumbers
  }
  dative {
    ...allNounNumbers
  }
  accusative {
    ...allNounNumbers
  }
  ablative {
    ...allNounNumbers
  }
  vocative {
    ...allNounNumbers
  }
  locative {
    ...allNounNumbers
  }
}
    `
export const AllIndicativePersonFragmentDoc = `
    fragment allIndicativePerson on IndicativePerson {
  first
  second
  third
}
    `
export const AllIndicativeNumberFragmentDoc = `
    fragment allIndicativeNumber on IndicativeNumber {
  singular {
    ...allIndicativePerson
  }
  plural {
    ...allIndicativePerson
  }
}
    `
export const AllIndicativeTenseFragmentDoc = `
    fragment allIndicativeTense on IndicativeTense {
  present {
    ...allIndicativeNumber
  }
  imperfect {
    ...allIndicativeNumber
  }
  future {
    ...allIndicativeNumber
  }
  perfect {
    ...allIndicativeNumber
  }
  pluperfect {
    ...allIndicativeNumber
  }
  futurePerfect {
    ...allIndicativeNumber
  }
}
    `
export const AllIndicativeFragmentDoc = `
    fragment allIndicative on Indicative {
  active {
    ...allIndicativeTense
  }
  passive {
    ...allIndicativeTense
  }
}
    `
export const AllSubjunctivePersonFragmentDoc = `
    fragment allSubjunctivePerson on SubjunctivePerson {
  first
  second
  third
}
    `
export const AllSubjunctiveNumberFragmentDoc = `
    fragment allSubjunctiveNumber on SubjunctiveNumber {
  singular {
    ...allSubjunctivePerson
  }
  plural {
    ...allSubjunctivePerson
  }
}
    `
export const AllSubjunctiveTenseFragmentDoc = `
    fragment allSubjunctiveTense on SubjunctiveTense {
  present {
    ...allSubjunctiveNumber
  }
  imperfect {
    ...allSubjunctiveNumber
  }
  perfect {
    ...allSubjunctiveNumber
  }
  pluperfect {
    ...allSubjunctiveNumber
  }
}
    `
export const AllSubjunctiveFragmentDoc = `
    fragment allSubjunctive on Subjunctive {
  active {
    ...allSubjunctiveTense
  }
  passive {
    ...allSubjunctiveTense
  }
}
    `
export const AllImperativeSecondFragmentDoc = `
    fragment allImperativeSecond on ImperativeSecond {
  second
}
    `
export const AllImperativePresentFragmentDoc = `
    fragment allImperativePresent on ImperativePresent {
  singular {
    ...allImperativeSecond
  }
  plural {
    ...allImperativeSecond
  }
}
    `
export const AllImperativeSecondThirdFragmentDoc = `
    fragment allImperativeSecondThird on ImperativeSecondThird {
  second
  third
}
    `
export const AllImperativeActiveFutureFragmentDoc = `
    fragment allImperativeActiveFuture on ImperativeActiveFuture {
  singular {
    ...allImperativeSecondThird
  }
  plural {
    ...allImperativeSecondThird
  }
}
    `
export const AllImperativeActiveFragmentDoc = `
    fragment allImperativeActive on ImperativeActive {
  present {
    ...allImperativePresent
  }
  future {
    ...allImperativeActiveFuture
  }
}
    `
export const AllImperativeThirdFragmentDoc = `
    fragment allImperativeThird on ImperativeThird {
  third
}
    `
export const AllImperativePassiveFutureFragmentDoc = `
    fragment allImperativePassiveFuture on ImperativePassiveFuture {
  singular {
    ...allImperativeSecondThird
  }
  plural {
    ...allImperativeThird
  }
}
    `
export const AllImperativePassiveFragmentDoc = `
    fragment allImperativePassive on ImperativePassive {
  present {
    ...allImperativePresent
  }
  future {
    ...allImperativePassiveFuture
  }
}
    `
export const AllImperativeFragmentDoc = `
    fragment allImperative on Imperative {
  active {
    ...allImperativeActive
  }
  passive {
    ...allImperativePassive
  }
}
    `
export const AllNonFinitePresentPerfectFutureFragmentDoc = `
    fragment allNonFinitePresentPerfectFuture on NonFinitePresentPerfectFuture {
  present
  perfect
  future
}
    `
export const AllNonFiniteInfinitiveFragmentDoc = `
    fragment allNonFiniteInfinitive on NonFiniteInfinitive {
  active {
    ...allNonFinitePresentPerfectFuture
  }
  passive {
    ...allNonFinitePresentPerfectFuture
  }
}
    `
export const AllNonFinitePresentFutureFragmentDoc = `
    fragment allNonFinitePresentFuture on NonFinitePresentFuture {
  present
  future
}
    `
export const AllNonFinitePerfectFutureFragmentDoc = `
    fragment allNonFinitePerfectFuture on NonFinitePerfectFuture {
  perfect
  future
}
    `
export const AllNonFiniteParticipleFragmentDoc = `
    fragment allNonFiniteParticiple on NonFiniteParticiple {
  active {
    ...allNonFinitePresentFuture
  }
  passive {
    ...allNonFinitePerfectFuture
  }
}
    `
export const AllNonFiniteFragmentDoc = `
    fragment allNonFinite on NonFinite {
  infinitive {
    ...allNonFiniteInfinitive
  }
  participle {
    ...allNonFiniteParticiple
  }
}
    `
export const AllGerundFragmentDoc = `
    fragment allGerund on Gerund {
  genitive
  dative
  accusative
  ablative
}
    `
export const AllSupineFragmentDoc = `
    fragment allSupine on Supine {
  accusative
  ablative
}
    `
export const AllVerbalNounFragmentDoc = `
    fragment allVerbalNoun on VerbalNoun {
  gerund {
    ...allGerund
  }
  supine {
    ...allSupine
  }
}
    `
export const AllVerbFormsFragmentDoc = `
    fragment allVerbForms on VerbForms {
  indicative {
    ...allIndicative
  }
  subjunctive {
    ...allSubjunctive
  }
  imperative {
    ...allImperative
  }
  nonFinite {
    ...allNonFinite
  }
  verbalNoun {
    ...allVerbalNoun
  }
}
    `
export const AllAdjectiveNumberFragmentDoc = `
    fragment allAdjectiveNumber on AdjectiveNumber {
  singular
  plural
}
    `
export const AllAdjectiveCaseFragmentDoc = `
    fragment allAdjectiveCase on AdjectiveCase {
  nominative {
    ...allAdjectiveNumber
  }
  genitive {
    ...allAdjectiveNumber
  }
  dative {
    ...allAdjectiveNumber
  }
  accusative {
    ...allAdjectiveNumber
  }
  ablative {
    ...allAdjectiveNumber
  }
  vocative {
    ...allAdjectiveNumber
  }
  locative {
    ...allAdjectiveNumber
  }
}
    `
export const AllAdjectiveFormsFragmentDoc = `
    fragment allAdjectiveForms on AdjectiveForms {
  masculine {
    ...allAdjectiveCase
  }
  feminine {
    ...allAdjectiveCase
  }
  neuter {
    ...allAdjectiveCase
  }
}
    `
export const AllAdverbFormsFragmentDoc = `
    fragment allAdverbForms on AdverbForms {
  positive
  comparative
  superlative
}
    `
export const AllFormsFragmentDoc = `
    fragment allForms on Forms {
  ... on NounForms {
    ...allNounForms
  }
  ... on VerbForms {
    ...allVerbForms
  }
  ... on AdjectiveForms {
    ...allAdjectiveForms
  }
  ... on AdverbForms {
    ...allAdverbForms
  }
}
    `
export const AllEntryFragmentDoc = `
    fragment allEntry on Entry {
  id
  partOfSpeech
  principalParts {
    ...allPrincipalParts
  }
  inflection {
    ...allInflections
  }
  translations {
    ...allTranslations
  }
  forms {
    ...allForms
  }
  identifiers
  bookmarked
}
    `
export const AllSettingsFragmentDoc = `
    fragment allSettings on Settings {
  theme
  fontSize
  formsExpandedDefault
  translationsExpandedDefault
  dictionaryMacronized
  literatureMacronized
}
    `
export const CommentDocument = `
    mutation comment(`
export const useCommentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CommentMutation,
    TError,
    CommentMutationVariables,
    TContext
  >,
) =>
  useMutation<CommentMutation, TError, CommentMutationVariables, TContext>(
    (variables?: CommentMutationVariables) =>
      fetcher<CommentMutation, CommentMutationVariables>(
        CommentDocument,
        variables,
      )(),
    options,
  )
export const BookmarkDocument = `
    mutation Bookmark(`
export const useBookmarkMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    BookmarkMutation,
    TError,
    BookmarkMutationVariables,
    TContext
  >,
) =>
  useMutation<BookmarkMutation, TError, BookmarkMutationVariables, TContext>(
    (variables?: BookmarkMutationVariables) =>
      fetcher<BookmarkMutation, BookmarkMutationVariables>(
        BookmarkDocument,
        variables,
      )(),
    options,
  )
export const BookmarksDocument = `
    query Bookmarks {
  bookmarks {
    ...allEntry
  }
}
    ${AllEntryFragmentDoc}
${AllPrincipalPartsFragmentDoc}
${AllInflectionsFragmentDoc}
${AllNounInflectionsFragmentDoc}
${AllVerbInflectionsFragmentDoc}
${AllAdjectiveInflectionsFragmentDoc}
${AllAdverbInflectionsFragmentDoc}
${AllPrepositionInflectionsFragmentDoc}
${AllUninflectedFragmentDoc}
${AllTranslationsFragmentDoc}
${AllFormsFragmentDoc}
${AllNounFormsFragmentDoc}
${AllNounNumbersFragmentDoc}
${AllVerbFormsFragmentDoc}
${AllIndicativeFragmentDoc}
${AllIndicativeTenseFragmentDoc}
${AllIndicativeNumberFragmentDoc}
${AllIndicativePersonFragmentDoc}
${AllSubjunctiveFragmentDoc}
${AllSubjunctiveTenseFragmentDoc}
${AllSubjunctiveNumberFragmentDoc}
${AllSubjunctivePersonFragmentDoc}
${AllImperativeFragmentDoc}
${AllImperativeActiveFragmentDoc}
${AllImperativePresentFragmentDoc}
${AllImperativeSecondFragmentDoc}
${AllImperativeActiveFutureFragmentDoc}
${AllImperativeSecondThirdFragmentDoc}
${AllImperativePassiveFragmentDoc}
${AllImperativePassiveFutureFragmentDoc}
${AllImperativeThirdFragmentDoc}
${AllNonFiniteFragmentDoc}
${AllNonFiniteInfinitiveFragmentDoc}
${AllNonFinitePresentPerfectFutureFragmentDoc}
${AllNonFiniteParticipleFragmentDoc}
${AllNonFinitePresentFutureFragmentDoc}
${AllNonFinitePerfectFutureFragmentDoc}
${AllVerbalNounFragmentDoc}
${AllGerundFragmentDoc}
${AllSupineFragmentDoc}
${AllAdjectiveFormsFragmentDoc}
${AllAdjectiveCaseFragmentDoc}
${AllAdjectiveNumberFragmentDoc}
${AllAdverbFormsFragmentDoc}`
export const useBookmarksQuery = <TData = BookmarksQuery, TError = unknown>(
  variables?: BookmarksQueryVariables,
  options?: UseQueryOptions<BookmarksQuery, TError, TData>,
) =>
  useQuery<BookmarksQuery, TError, TData>(
    ["Bookmarks", variables],
    fetcher<BookmarksQuery, BookmarksQueryVariables>(
      BookmarksDocument,
      variables,
    ),
    options,
  )
useBookmarksQuery.getKey = (variables?: BookmarksQueryVariables) => [
  "Bookmarks",
  variables,
]

useBookmarksQuery.fetcher = (variables?: BookmarksQueryVariables) =>
  fetcher<BookmarksQuery, BookmarksQueryVariables>(BookmarksDocument, variables)
export const EntriesDocument = `
    query Entries($ids: [String!]!) {
  entries(ids: $ids) {
    ...allEntry
  }
}
    ${AllEntryFragmentDoc}
${AllPrincipalPartsFragmentDoc}
${AllInflectionsFragmentDoc}
${AllNounInflectionsFragmentDoc}
${AllVerbInflectionsFragmentDoc}
${AllAdjectiveInflectionsFragmentDoc}
${AllAdverbInflectionsFragmentDoc}
${AllPrepositionInflectionsFragmentDoc}
${AllUninflectedFragmentDoc}
${AllTranslationsFragmentDoc}
${AllFormsFragmentDoc}
${AllNounFormsFragmentDoc}
${AllNounNumbersFragmentDoc}
${AllVerbFormsFragmentDoc}
${AllIndicativeFragmentDoc}
${AllIndicativeTenseFragmentDoc}
${AllIndicativeNumberFragmentDoc}
${AllIndicativePersonFragmentDoc}
${AllSubjunctiveFragmentDoc}
${AllSubjunctiveTenseFragmentDoc}
${AllSubjunctiveNumberFragmentDoc}
${AllSubjunctivePersonFragmentDoc}
${AllImperativeFragmentDoc}
${AllImperativeActiveFragmentDoc}
${AllImperativePresentFragmentDoc}
${AllImperativeSecondFragmentDoc}
${AllImperativeActiveFutureFragmentDoc}
${AllImperativeSecondThirdFragmentDoc}
${AllImperativePassiveFragmentDoc}
${AllImperativePassiveFutureFragmentDoc}
${AllImperativeThirdFragmentDoc}
${AllNonFiniteFragmentDoc}
${AllNonFiniteInfinitiveFragmentDoc}
${AllNonFinitePresentPerfectFutureFragmentDoc}
${AllNonFiniteParticipleFragmentDoc}
${AllNonFinitePresentFutureFragmentDoc}
${AllNonFinitePerfectFutureFragmentDoc}
${AllVerbalNounFragmentDoc}
${AllGerundFragmentDoc}
${AllSupineFragmentDoc}
${AllAdjectiveFormsFragmentDoc}
${AllAdjectiveCaseFragmentDoc}
${AllAdjectiveNumberFragmentDoc}
${AllAdverbFormsFragmentDoc}`
export const useEntriesQuery = <TData = EntriesQuery, TError = unknown>(
  variables: EntriesQueryVariables,
  options?: UseQueryOptions<EntriesQuery, TError, TData>,
) =>
  useQuery<EntriesQuery, TError, TData>(
    ["Entries", variables],
    fetcher<EntriesQuery, EntriesQueryVariables>(EntriesDocument, variables),
    options,
  )
useEntriesQuery.getKey = (variables: EntriesQueryVariables) => [
  "Entries",
  variables,
]

useEntriesQuery.fetcher = (variables: EntriesQueryVariables) =>
  fetcher<EntriesQuery, EntriesQueryVariables>(EntriesDocument, variables)
export const UnbookmarkDocument = `
    mutation Unbookmark($entryId: String!) {
  unbookmark(entryId: $entryId)
}
    `
export const useUnbookmarkMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UnbookmarkMutation,
    TError,
    UnbookmarkMutationVariables,
    TContext
  >,
) =>
  useMutation<
    UnbookmarkMutation,
    TError,
    UnbookmarkMutationVariables,
    TContext
  >(
    (variables?: UnbookmarkMutationVariables) =>
      fetcher<UnbookmarkMutation, UnbookmarkMutationVariables>(
        UnbookmarkDocument,
        variables,
      )(),
    options,
  )
export const CreateCustomTextDocument = `
    mutation CreateCustomText($id: String!, $title: String!, $text: String!) {
  createCustomText(id: $id, title: $title, text: $text) {
    id
    title
    text
  }
}
    `
export const useCreateCustomTextMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    CreateCustomTextMutation,
    TError,
    CreateCustomTextMutationVariables,
    TContext
  >,
) =>
  useMutation<
    CreateCustomTextMutation,
    TError,
    CreateCustomTextMutationVariables,
    TContext
  >(
    (variables?: CreateCustomTextMutationVariables) =>
      fetcher<CreateCustomTextMutation, CreateCustomTextMutationVariables>(
        CreateCustomTextDocument,
        variables,
      )(),
    options,
  )
export const DeleteCustomTextDocument = `
    mutation DeleteCustomText($id: String!) {
  deleteCustomText(id: $id)
}
    `
export const useDeleteCustomTextMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    DeleteCustomTextMutation,
    TError,
    DeleteCustomTextMutationVariables,
    TContext
  >,
) =>
  useMutation<
    DeleteCustomTextMutation,
    TError,
    DeleteCustomTextMutationVariables,
    TContext
  >(
    (variables?: DeleteCustomTextMutationVariables) =>
      fetcher<DeleteCustomTextMutation, DeleteCustomTextMutationVariables>(
        DeleteCustomTextDocument,
        variables,
      )(),
    options,
  )
export const GetCustomTextDocument = `
    query GetCustomText($id: String!) {
  getCustomText(id: $id) {
    id
    title
    text
  }
}
    `
export const useGetCustomTextQuery = <
  TData = GetCustomTextQuery,
  TError = unknown
>(
  variables: GetCustomTextQueryVariables,
  options?: UseQueryOptions<GetCustomTextQuery, TError, TData>,
) =>
  useQuery<GetCustomTextQuery, TError, TData>(
    ["GetCustomText", variables],
    fetcher<GetCustomTextQuery, GetCustomTextQueryVariables>(
      GetCustomTextDocument,
      variables,
    ),
    options,
  )
useGetCustomTextQuery.getKey = (variables: GetCustomTextQueryVariables) => [
  "GetCustomText",
  variables,
]

useGetCustomTextQuery.fetcher = (variables: GetCustomTextQueryVariables) =>
  fetcher<GetCustomTextQuery, GetCustomTextQueryVariables>(
    GetCustomTextDocument,
    variables,
  )
export const ListCustomTextsDocument = `
    query ListCustomTexts {
  listCustomTexts {
    id
    title
    text
  }
}
    `
export const useListCustomTextsQuery = <
  TData = ListCustomTextsQuery,
  TError = unknown
>(
  variables?: ListCustomTextsQueryVariables,
  options?: UseQueryOptions<ListCustomTextsQuery, TError, TData>,
) =>
  useQuery<ListCustomTextsQuery, TError, TData>(
    ["ListCustomTexts", variables],
    fetcher<ListCustomTextsQuery, ListCustomTextsQueryVariables>(
      ListCustomTextsDocument,
      variables,
    ),
    options,
  )
useListCustomTextsQuery.getKey = (
  variables?: ListCustomTextsQueryVariables,
) => ["ListCustomTexts", variables]

useListCustomTextsQuery.fetcher = (variables?: ListCustomTextsQueryVariables) =>
  fetcher<ListCustomTextsQuery, ListCustomTextsQueryVariables>(
    ListCustomTextsDocument,
    variables,
  )
export const FindTextDocument = `
    query FindText($author: String!, $book: String, $title: String!) {
  findText(author: $author, book: $book, title: $title) {
    id
    title
    lines {
      id
      line
      lineNumber
      lineLabel
    }
    book {
      id
      title
    }
    author {
      id
      name
    }
  }
}
    `
export const useFindTextQuery = <TData = FindTextQuery, TError = unknown>(
  variables: FindTextQueryVariables,
  options?: UseQueryOptions<FindTextQuery, TError, TData>,
) =>
  useQuery<FindTextQuery, TError, TData>(
    ["FindText", variables],
    fetcher<FindTextQuery, FindTextQueryVariables>(FindTextDocument, variables),
    options,
  )
useFindTextQuery.getKey = (variables: FindTextQueryVariables) => [
  "FindText",
  variables,
]

useFindTextQuery.fetcher = (variables: FindTextQueryVariables) =>
  fetcher<FindTextQuery, FindTextQueryVariables>(FindTextDocument, variables)
export const GetAuthorsDocument = `
    query GetAuthors {
  getAuthors {
    id
    name
    books {
      id
      title
      texts {
        id
        title
      }
    }
    texts {
      id
      title
    }
  }
}
    `
export const useGetAuthorsQuery = <TData = GetAuthorsQuery, TError = unknown>(
  variables?: GetAuthorsQueryVariables,
  options?: UseQueryOptions<GetAuthorsQuery, TError, TData>,
) =>
  useQuery<GetAuthorsQuery, TError, TData>(
    ["GetAuthors", variables],
    fetcher<GetAuthorsQuery, GetAuthorsQueryVariables>(
      GetAuthorsDocument,
      variables,
    ),
    options,
  )
useGetAuthorsQuery.getKey = (variables?: GetAuthorsQueryVariables) => [
  "GetAuthors",
  variables,
]

useGetAuthorsQuery.fetcher = (variables?: GetAuthorsQueryVariables) =>
  fetcher<GetAuthorsQuery, GetAuthorsQueryVariables>(
    GetAuthorsDocument,
    variables,
  )
export const GetTextDocument = `
    query GetText($id: String!) {
  getText(id: $id) {
    id
    title
    lines {
      id
      line
      lineNumber
      lineLabel
    }
    book {
      id
      title
    }
    author {
      id
      name
    }
  }
}
    `
export const useGetTextQuery = <TData = GetTextQuery, TError = unknown>(
  variables: GetTextQueryVariables,
  options?: UseQueryOptions<GetTextQuery, TError, TData>,
) =>
  useQuery<GetTextQuery, TError, TData>(
    ["GetText", variables],
    fetcher<GetTextQuery, GetTextQueryVariables>(GetTextDocument, variables),
    options,
  )
useGetTextQuery.getKey = (variables: GetTextQueryVariables) => [
  "GetText",
  variables,
]

useGetTextQuery.fetcher = (variables: GetTextQueryVariables) =>
  fetcher<GetTextQuery, GetTextQueryVariables>(GetTextDocument, variables)
export const GetTextIdsDocument = `
    query GetTextIds {
  getTextIds {
    id
  }
}
    `
export const useGetTextIdsQuery = <TData = GetTextIdsQuery, TError = unknown>(
  variables?: GetTextIdsQueryVariables,
  options?: UseQueryOptions<GetTextIdsQuery, TError, TData>,
) =>
  useQuery<GetTextIdsQuery, TError, TData>(
    ["GetTextIds", variables],
    fetcher<GetTextIdsQuery, GetTextIdsQueryVariables>(
      GetTextIdsDocument,
      variables,
    ),
    options,
  )
useGetTextIdsQuery.getKey = (variables?: GetTextIdsQueryVariables) => [
  "GetTextIds",
  variables,
]

useGetTextIdsQuery.fetcher = (variables?: GetTextIdsQueryVariables) =>
  fetcher<GetTextIdsQuery, GetTextIdsQueryVariables>(
    GetTextIdsDocument,
    variables,
  )
export const GetTextsDocument = `
    query GetTexts {
  getTexts {
    id
    title
    author {
      name
    }
    book {
      id
      title
    }
  }
}
    `
export const useGetTextsQuery = <TData = GetTextsQuery, TError = unknown>(
  variables?: GetTextsQueryVariables,
  options?: UseQueryOptions<GetTextsQuery, TError, TData>,
) =>
  useQuery<GetTextsQuery, TError, TData>(
    ["GetTexts", variables],
    fetcher<GetTextsQuery, GetTextsQueryVariables>(GetTextsDocument, variables),
    options,
  )
useGetTextsQuery.getKey = (variables?: GetTextsQueryVariables) => [
  "GetTexts",
  variables,
]

useGetTextsQuery.fetcher = (variables?: GetTextsQueryVariables) =>
  fetcher<GetTextsQuery, GetTextsQueryVariables>(GetTextsDocument, variables)
export const SearchEnglishDocument = `
    query SearchEnglish($search: String!) {
  searchEnglish(search: $search) {
    ...allEntry
  }
}
    ${AllEntryFragmentDoc}
${AllPrincipalPartsFragmentDoc}
${AllInflectionsFragmentDoc}
${AllNounInflectionsFragmentDoc}
${AllVerbInflectionsFragmentDoc}
${AllAdjectiveInflectionsFragmentDoc}
${AllAdverbInflectionsFragmentDoc}
${AllPrepositionInflectionsFragmentDoc}
${AllUninflectedFragmentDoc}
${AllTranslationsFragmentDoc}
${AllFormsFragmentDoc}
${AllNounFormsFragmentDoc}
${AllNounNumbersFragmentDoc}
${AllVerbFormsFragmentDoc}
${AllIndicativeFragmentDoc}
${AllIndicativeTenseFragmentDoc}
${AllIndicativeNumberFragmentDoc}
${AllIndicativePersonFragmentDoc}
${AllSubjunctiveFragmentDoc}
${AllSubjunctiveTenseFragmentDoc}
${AllSubjunctiveNumberFragmentDoc}
${AllSubjunctivePersonFragmentDoc}
${AllImperativeFragmentDoc}
${AllImperativeActiveFragmentDoc}
${AllImperativePresentFragmentDoc}
${AllImperativeSecondFragmentDoc}
${AllImperativeActiveFutureFragmentDoc}
${AllImperativeSecondThirdFragmentDoc}
${AllImperativePassiveFragmentDoc}
${AllImperativePassiveFutureFragmentDoc}
${AllImperativeThirdFragmentDoc}
${AllNonFiniteFragmentDoc}
${AllNonFiniteInfinitiveFragmentDoc}
${AllNonFinitePresentPerfectFutureFragmentDoc}
${AllNonFiniteParticipleFragmentDoc}
${AllNonFinitePresentFutureFragmentDoc}
${AllNonFinitePerfectFutureFragmentDoc}
${AllVerbalNounFragmentDoc}
${AllGerundFragmentDoc}
${AllSupineFragmentDoc}
${AllAdjectiveFormsFragmentDoc}
${AllAdjectiveCaseFragmentDoc}
${AllAdjectiveNumberFragmentDoc}
${AllAdverbFormsFragmentDoc}`
export const useSearchEnglishQuery = <
  TData = SearchEnglishQuery,
  TError = unknown
>(
  variables: SearchEnglishQueryVariables,
  options?: UseQueryOptions<SearchEnglishQuery, TError, TData>,
) =>
  useQuery<SearchEnglishQuery, TError, TData>(
    ["SearchEnglish", variables],
    fetcher<SearchEnglishQuery, SearchEnglishQueryVariables>(
      SearchEnglishDocument,
      variables,
    ),
    options,
  )
useSearchEnglishQuery.getKey = (variables: SearchEnglishQueryVariables) => [
  "SearchEnglish",
  variables,
]

useSearchEnglishQuery.fetcher = (variables: SearchEnglishQueryVariables) =>
  fetcher<SearchEnglishQuery, SearchEnglishQueryVariables>(
    SearchEnglishDocument,
    variables,
  )
export const SearchLatinDocument = `
    query SearchLatin($search: String!) {
  searchLatin(search: $search) {
    ...allEntry
  }
}
    ${AllEntryFragmentDoc}
${AllPrincipalPartsFragmentDoc}
${AllInflectionsFragmentDoc}
${AllNounInflectionsFragmentDoc}
${AllVerbInflectionsFragmentDoc}
${AllAdjectiveInflectionsFragmentDoc}
${AllAdverbInflectionsFragmentDoc}
${AllPrepositionInflectionsFragmentDoc}
${AllUninflectedFragmentDoc}
${AllTranslationsFragmentDoc}
${AllFormsFragmentDoc}
${AllNounFormsFragmentDoc}
${AllNounNumbersFragmentDoc}
${AllVerbFormsFragmentDoc}
${AllIndicativeFragmentDoc}
${AllIndicativeTenseFragmentDoc}
${AllIndicativeNumberFragmentDoc}
${AllIndicativePersonFragmentDoc}
${AllSubjunctiveFragmentDoc}
${AllSubjunctiveTenseFragmentDoc}
${AllSubjunctiveNumberFragmentDoc}
${AllSubjunctivePersonFragmentDoc}
${AllImperativeFragmentDoc}
${AllImperativeActiveFragmentDoc}
${AllImperativePresentFragmentDoc}
${AllImperativeSecondFragmentDoc}
${AllImperativeActiveFutureFragmentDoc}
${AllImperativeSecondThirdFragmentDoc}
${AllImperativePassiveFragmentDoc}
${AllImperativePassiveFutureFragmentDoc}
${AllImperativeThirdFragmentDoc}
${AllNonFiniteFragmentDoc}
${AllNonFiniteInfinitiveFragmentDoc}
${AllNonFinitePresentPerfectFutureFragmentDoc}
${AllNonFiniteParticipleFragmentDoc}
${AllNonFinitePresentFutureFragmentDoc}
${AllNonFinitePerfectFutureFragmentDoc}
${AllVerbalNounFragmentDoc}
${AllGerundFragmentDoc}
${AllSupineFragmentDoc}
${AllAdjectiveFormsFragmentDoc}
${AllAdjectiveCaseFragmentDoc}
${AllAdjectiveNumberFragmentDoc}
${AllAdverbFormsFragmentDoc}`
export const useSearchLatinQuery = <TData = SearchLatinQuery, TError = unknown>(
  variables: SearchLatinQueryVariables,
  options?: UseQueryOptions<SearchLatinQuery, TError, TData>,
) =>
  useQuery<SearchLatinQuery, TError, TData>(
    ["SearchLatin", variables],
    fetcher<SearchLatinQuery, SearchLatinQueryVariables>(
      SearchLatinDocument,
      variables,
    ),
    options,
  )
useSearchLatinQuery.getKey = (variables: SearchLatinQueryVariables) => [
  "SearchLatin",
  variables,
]

useSearchLatinQuery.fetcher = (variables: SearchLatinQueryVariables) =>
  fetcher<SearchLatinQuery, SearchLatinQueryVariables>(
    SearchLatinDocument,
    variables,
  )
export const FacebookDocument = `
    query Facebook($code: String!) {
  facebook(code: $code) {
    id
    email
    facebookId
  }
}
    `
export const useFacebookQuery = <TData = FacebookQuery, TError = unknown>(
  variables: FacebookQueryVariables,
  options?: UseQueryOptions<FacebookQuery, TError, TData>,
) =>
  useQuery<FacebookQuery, TError, TData>(
    ["Facebook", variables],
    fetcher<FacebookQuery, FacebookQueryVariables>(FacebookDocument, variables),
    options,
  )
useFacebookQuery.getKey = (variables: FacebookQueryVariables) => [
  "Facebook",
  variables,
]

useFacebookQuery.fetcher = (variables: FacebookQueryVariables) =>
  fetcher<FacebookQuery, FacebookQueryVariables>(FacebookDocument, variables)
export const GoogleDocument = `
    query Google($code: String!) {
  google(code: $code) {
    id
    email
    googleId
  }
}
    `
export const useGoogleQuery = <TData = GoogleQuery, TError = unknown>(
  variables: GoogleQueryVariables,
  options?: UseQueryOptions<GoogleQuery, TError, TData>,
) =>
  useQuery<GoogleQuery, TError, TData>(
    ["Google", variables],
    fetcher<GoogleQuery, GoogleQueryVariables>(GoogleDocument, variables),
    options,
  )
useGoogleQuery.getKey = (variables: GoogleQueryVariables) => [
  "Google",
  variables,
]

useGoogleQuery.fetcher = (variables: GoogleQueryVariables) =>
  fetcher<GoogleQuery, GoogleQueryVariables>(GoogleDocument, variables)
export const LoginDocument = `
    query Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
  }
}
    `
export const useLoginQuery = <TData = LoginQuery, TError = unknown>(
  variables: LoginQueryVariables,
  options?: UseQueryOptions<LoginQuery, TError, TData>,
) =>
  useQuery<LoginQuery, TError, TData>(
    ["Login", variables],
    fetcher<LoginQuery, LoginQueryVariables>(LoginDocument, variables),
    options,
  )
useLoginQuery.getKey = (variables: LoginQueryVariables) => ["Login", variables]

useLoginQuery.fetcher = (variables: LoginQueryVariables) =>
  fetcher<LoginQuery, LoginQueryVariables>(LoginDocument, variables)
export const LogoutDocument = `
    query Logout {
  logout
}
    `
export const useLogoutQuery = <TData = LogoutQuery, TError = unknown>(
  variables?: LogoutQueryVariables,
  options?: UseQueryOptions<LogoutQuery, TError, TData>,
) =>
  useQuery<LogoutQuery, TError, TData>(
    ["Logout", variables],
    fetcher<LogoutQuery, LogoutQueryVariables>(LogoutDocument, variables),
    options,
  )
useLogoutQuery.getKey = (variables?: LogoutQueryVariables) => [
  "Logout",
  variables,
]

useLogoutQuery.fetcher = (variables?: LogoutQueryVariables) =>
  fetcher<LogoutQuery, LogoutQueryVariables>(LogoutDocument, variables)
export const RecoverPasswordDocument = `
    mutation RecoverPassword($email: String!) {
  recoverPassword(email: $email)
}
    `
export const useRecoverPasswordMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    RecoverPasswordMutation,
    TError,
    RecoverPasswordMutationVariables,
    TContext
  >,
) =>
  useMutation<
    RecoverPasswordMutation,
    TError,
    RecoverPasswordMutationVariables,
    TContext
  >(
    (variables?: RecoverPasswordMutationVariables) =>
      fetcher<RecoverPasswordMutation, RecoverPasswordMutationVariables>(
        RecoverPasswordDocument,
        variables,
      )(),
    options,
  )
export const RegisterDocument = `
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    id
    email
  }
}
    `
export const useRegisterMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    RegisterMutation,
    TError,
    RegisterMutationVariables,
    TContext
  >,
) =>
  useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
    (variables?: RegisterMutationVariables) =>
      fetcher<RegisterMutation, RegisterMutationVariables>(
        RegisterDocument,
        variables,
      )(),
    options,
  )
export const ResetPasswordDocument = `
    mutation ResetPassword($passwordResetToken: String!, $password: String!) {
  resetPassword(passwordResetToken: $passwordResetToken, password: $password)
}
    `
export const useResetPasswordMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    ResetPasswordMutation,
    TError,
    ResetPasswordMutationVariables,
    TContext
  >,
) =>
  useMutation<
    ResetPasswordMutation,
    TError,
    ResetPasswordMutationVariables,
    TContext
  >(
    (variables?: ResetPasswordMutationVariables) =>
      fetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(
        ResetPasswordDocument,
        variables,
      )(),
    options,
  )
export const UnregisterDocument = `
    mutation Unregister {
  unregister
}
    `
export const useUnregisterMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    UnregisterMutation,
    TError,
    UnregisterMutationVariables,
    TContext
  >,
) =>
  useMutation<
    UnregisterMutation,
    TError,
    UnregisterMutationVariables,
    TContext
  >(
    (variables?: UnregisterMutationVariables) =>
      fetcher<UnregisterMutation, UnregisterMutationVariables>(
        UnregisterDocument,
        variables,
      )(),
    options,
  )
export const UserDocument = `
    query User {
  user {
    id
    email
    googleId
    facebookId
    settings {
      ...allSettings
    }
  }
}
    ${AllSettingsFragmentDoc}`
export const useUserQuery = <TData = UserQuery, TError = unknown>(
  variables?: UserQueryVariables,
  options?: UseQueryOptions<UserQuery, TError, TData>,
) =>
  useQuery<UserQuery, TError, TData>(
    ["User", variables],
    fetcher<UserQuery, UserQueryVariables>(UserDocument, variables),
    options,
  )
useUserQuery.getKey = (variables?: UserQueryVariables) => ["User", variables]

useUserQuery.fetcher = (variables?: UserQueryVariables) =>
  fetcher<UserQuery, UserQueryVariables>(UserDocument, variables)
export const ValidatePasswordResetTokenDocument = `
    query ValidatePasswordResetToken($passwordResetToken: String!) {
  validatePasswordResetToken(passwordResetToken: $passwordResetToken)
}
    `
export const useValidatePasswordResetTokenQuery = <
  TData = ValidatePasswordResetTokenQuery,
  TError = unknown
>(
  variables: ValidatePasswordResetTokenQueryVariables,
  options?: UseQueryOptions<ValidatePasswordResetTokenQuery, TError, TData>,
) =>
  useQuery<ValidatePasswordResetTokenQuery, TError, TData>(
    ["ValidatePasswordResetToken", variables],
    fetcher<
      ValidatePasswordResetTokenQuery,
      ValidatePasswordResetTokenQueryVariables
    >(ValidatePasswordResetTokenDocument, variables),
    options,
  )
useValidatePasswordResetTokenQuery.getKey = (
  variables: ValidatePasswordResetTokenQueryVariables,
) => ["ValidatePasswordResetToken", variables]

useValidatePasswordResetTokenQuery.fetcher = (
  variables: ValidatePasswordResetTokenQueryVariables,
) =>
  fetcher<
    ValidatePasswordResetTokenQuery,
    ValidatePasswordResetTokenQueryVariables
  >(ValidatePasswordResetTokenDocument, variables)
export const SetSettingsDocument = `
    mutation SetSettings($settings: SettingsInput!) {
  setSettings(settings: $settings)
}
    `
export const useSetSettingsMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    SetSettingsMutation,
    TError,
    SetSettingsMutationVariables,
    TContext
  >,
) =>
  useMutation<
    SetSettingsMutation,
    TError,
    SetSettingsMutationVariables,
    TContext
  >(
    (variables?: SetSettingsMutationVariables) =>
      fetcher<SetSettingsMutation, SetSettingsMutationVariables>(
        SetSettingsDocument,
        variables,
      )(),
    options,
  )
