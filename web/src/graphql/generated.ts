/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { clientEndpoint as endpointUrl } from '../pages/_app'

import gql from 'graphql-tag';
import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpointUrl as string, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {"content-type":"application/json"},
      body: JSON.stringify({ query, variables }),
    });
    
    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AdjectiveCase = {
  ablative?: Maybe<AdjectiveNumber>;
  accusative?: Maybe<AdjectiveNumber>;
  dative?: Maybe<AdjectiveNumber>;
  genitive?: Maybe<AdjectiveNumber>;
  locative?: Maybe<AdjectiveNumber>;
  nominative?: Maybe<AdjectiveNumber>;
  vocative?: Maybe<AdjectiveNumber>;
};

export type AdjectiveForms = {
  feminine?: Maybe<AdjectiveCase>;
  masculine?: Maybe<AdjectiveCase>;
  neuter?: Maybe<AdjectiveCase>;
};

export type AdjectiveInflection = {
  declension: Scalars['String'];
  degree: Scalars['String'];
  other: Scalars['String'];
};

export type AdjectiveNumber = {
  plural?: Maybe<Array<Scalars['String']>>;
  singular?: Maybe<Array<Scalars['String']>>;
};

export type AdverbForms = {
  comparative?: Maybe<Array<Scalars['String']>>;
  positive?: Maybe<Array<Scalars['String']>>;
  superlative?: Maybe<Array<Scalars['String']>>;
};

export type AdverbInflection = {
  degree: Scalars['String'];
  type: Scalars['String'];
};

export type Author = {
  books?: Maybe<Array<Book>>;
  id: Scalars['String'];
  name: Scalars['String'];
  texts: Array<Text>;
};

export type Book = {
  author: Author;
  id: Scalars['ID'];
  texts: Array<Text>;
  title: Scalars['String'];
};

export type CustomText = {
  id: Scalars['ID'];
  text: Scalars['String'];
  title: Scalars['String'];
  user: User;
};


export type Entry = {
  bookmarked?: Maybe<Scalars['Boolean']>;
  etymology?: Maybe<Scalars['String']>;
  forms?: Maybe<Forms>;
  id: Scalars['ID'];
  identifiers?: Maybe<Array<Scalars['String']>>;
  inflection?: Maybe<Inflection>;
  isLatinSearchResult?: Maybe<Scalars['Boolean']>;
  partOfSpeech: Scalars['String'];
  principalParts?: Maybe<Array<PrincipalPart>>;
  pronunciation?: Maybe<Pronunciation>;
  translations?: Maybe<Array<Translation>>;
  users?: Maybe<Array<User>>;
  words: Array<Word>;
};

export type Forms = AdjectiveForms | AdverbForms | NounForms | VerbForms;

export type Gerund = {
  ablative?: Maybe<Array<Scalars['String']>>;
  accusative?: Maybe<Array<Scalars['String']>>;
  dative?: Maybe<Array<Scalars['String']>>;
  genitive?: Maybe<Array<Scalars['String']>>;
};

export type Imperative = {
  active?: Maybe<ImperativeActive>;
  passive?: Maybe<ImperativePassive>;
};

export type ImperativeActive = {
  future?: Maybe<ImperativeActiveFuture>;
  present?: Maybe<ImperativePresent>;
};

export type ImperativeActiveFuture = {
  plural?: Maybe<ImperativeSecondThird>;
  singular?: Maybe<ImperativeSecondThird>;
};

export type ImperativePassive = {
  future?: Maybe<ImperativePassiveFuture>;
  present?: Maybe<ImperativePresent>;
};

export type ImperativePassiveFuture = {
  plural?: Maybe<ImperativeThird>;
  singular?: Maybe<ImperativeSecondThird>;
};

export type ImperativePresent = {
  plural?: Maybe<ImperativeSecond>;
  singular?: Maybe<ImperativeSecond>;
};

export type ImperativeSecond = {
  second?: Maybe<Array<Scalars['String']>>;
};

export type ImperativeSecondThird = {
  second?: Maybe<Array<Scalars['String']>>;
  third?: Maybe<Array<Scalars['String']>>;
};

export type ImperativeThird = {
  third?: Maybe<Array<Scalars['String']>>;
};

export type Indicative = {
  active?: Maybe<IndicativeTense>;
  passive?: Maybe<IndicativeTense>;
};

export type IndicativeNumber = {
  plural?: Maybe<IndicativePerson>;
  singular?: Maybe<IndicativePerson>;
};

export type IndicativePerson = {
  first?: Maybe<Array<Scalars['String']>>;
  second?: Maybe<Array<Scalars['String']>>;
  third?: Maybe<Array<Scalars['String']>>;
};

export type IndicativeTense = {
  future?: Maybe<IndicativeNumber>;
  futurePerfect?: Maybe<IndicativeNumber>;
  imperfect?: Maybe<IndicativeNumber>;
  perfect?: Maybe<IndicativeNumber>;
  pluperfect?: Maybe<IndicativeNumber>;
  present?: Maybe<IndicativeNumber>;
};

export type Inflection = AdjectiveInflection | AdverbInflection | NounInflection | PrepositionInflection | Uninflected | VerbInflection;

export type Line = {
  id: Scalars['ID'];
  line: Scalars['String'];
  lineLabel: Scalars['String'];
  lineNumber: Scalars['Float'];
  text: Text;
};

export type Mutation = {
  bookmark: Scalars['Boolean'];
  createCustomText: CustomText;
  deleteCustomText: Scalars['Boolean'];
  setSettings: Settings;
  unbookmark: Scalars['Boolean'];
  unregister: Scalars['Boolean'];
};


export type MutationBookmarkArgs = {
  entryId: Scalars['String'];
};


export type MutationCreateCustomTextArgs = {
  id: Scalars['String'];
  text: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteCustomTextArgs = {
  id: Scalars['String'];
};


export type MutationSetSettingsArgs = {
  settings: SettingsInput;
};


export type MutationUnbookmarkArgs = {
  entryId: Scalars['String'];
};

export type NonFinite = {
  infinitive?: Maybe<NonFiniteInfinitive>;
  participle?: Maybe<NonFiniteParticiple>;
};

export type NonFiniteInfinitive = {
  active?: Maybe<NonFinitePresentPerfectFuture>;
  passive?: Maybe<NonFinitePresentPerfectFuture>;
};

export type NonFiniteParticiple = {
  active?: Maybe<NonFinitePresentFuture>;
  passive?: Maybe<NonFinitePerfectFuture>;
};

export type NonFinitePerfectFuture = {
  future?: Maybe<Array<Scalars['String']>>;
  perfect?: Maybe<Array<Scalars['String']>>;
};

export type NonFinitePresentFuture = {
  future?: Maybe<Array<Scalars['String']>>;
  present?: Maybe<Array<Scalars['String']>>;
};

export type NonFinitePresentPerfectFuture = {
  future?: Maybe<Array<Scalars['String']>>;
  perfect?: Maybe<Array<Scalars['String']>>;
  present?: Maybe<Array<Scalars['String']>>;
};

export type NounForms = {
  ablative?: Maybe<NounNumber>;
  accusative?: Maybe<NounNumber>;
  dative?: Maybe<NounNumber>;
  genitive?: Maybe<NounNumber>;
  locative?: Maybe<NounNumber>;
  nominative?: Maybe<NounNumber>;
  vocative?: Maybe<NounNumber>;
};

export type NounInflection = {
  declension: Scalars['String'];
  gender: Scalars['String'];
  other: Scalars['String'];
};

export type NounNumber = {
  plural?: Maybe<Array<Scalars['String']>>;
  singular?: Maybe<Array<Scalars['String']>>;
};

export type PrepositionInflection = {
  case: Scalars['String'];
  other: Scalars['String'];
};

export type PrincipalPart = {
  name: Scalars['String'];
  text: Array<Scalars['String']>;
};

export type Pronunciation = {
  classical: PronunciationParts;
  ecclesiastical: PronunciationParts;
  vulgar: PronunciationParts;
};

export type PronunciationParts = {
  phonemes: Scalars['String'];
  phonemic: Scalars['String'];
  phonetic: Scalars['String'];
};

export type Query = {
  author: Author;
  authors: Array<Author>;
  book: Book;
  bookmarks: Array<Entry>;
  books: Array<Book>;
  customText: CustomText;
  customTexts: Array<CustomText>;
  entries: Array<Entry>;
  entry: Entry;
  facebook: User;
  findText: Text;
  google: User;
  logout: Scalars['Boolean'];
  search: Array<Entry>;
  searchAuthors: Array<Author>;
  searchBooks: Array<Book>;
  searchEnglish: Array<Entry>;
  searchLatin: Array<Entry>;
  searchLines: Array<Line>;
  searchLiterature: Array<Author>;
  searchTexts: Array<Text>;
  settings: Settings;
  text: Text;
  textIds: Array<Scalars['ID']>;
  texts: Array<Text>;
  user?: Maybe<User>;
};


export type QueryAuthorArgs = {
  id: Scalars['String'];
};


export type QueryBookArgs = {
  id: Scalars['String'];
};


export type QueryCustomTextArgs = {
  id: Scalars['String'];
};


export type QueryEntriesArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryEntryArgs = {
  id: Scalars['String'];
};


export type QueryFacebookArgs = {
  code: Scalars['String'];
};


export type QueryFindTextArgs = {
  author: Scalars['String'];
  book?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};


export type QueryGoogleArgs = {
  code: Scalars['String'];
};


export type QuerySearchArgs = {
  search: Scalars['String'];
};


export type QuerySearchAuthorsArgs = {
  search: Scalars['String'];
};


export type QuerySearchBooksArgs = {
  search: Scalars['String'];
};


export type QuerySearchEnglishArgs = {
  search: Scalars['String'];
};


export type QuerySearchLatinArgs = {
  search: Scalars['String'];
};


export type QuerySearchLinesArgs = {
  search: Scalars['String'];
};


export type QuerySearchLiteratureArgs = {
  search: Scalars['String'];
};


export type QuerySearchTextsArgs = {
  search: Scalars['String'];
};


export type QueryTextArgs = {
  id: Scalars['String'];
};

export type Settings = {
  dictionaryMacronized?: Maybe<Scalars['Boolean']>;
  fontSize?: Maybe<Scalars['Float']>;
  formsExpandedDefault?: Maybe<Scalars['Boolean']>;
  literatureMacronized?: Maybe<Scalars['Boolean']>;
  theme?: Maybe<Scalars['String']>;
  translationsExpandedDefault?: Maybe<Scalars['Boolean']>;
};

export type SettingsInput = {
  dictionaryMacronized?: Maybe<Scalars['Boolean']>;
  fontSize?: Maybe<Scalars['Float']>;
  formsExpandedDefault?: Maybe<Scalars['Boolean']>;
  literatureMacronized?: Maybe<Scalars['Boolean']>;
  theme?: Maybe<Scalars['String']>;
  translationsExpandedDefault?: Maybe<Scalars['Boolean']>;
};

export type Subjunctive = {
  active?: Maybe<SubjunctiveTense>;
  passive?: Maybe<SubjunctiveTense>;
};

export type SubjunctiveNumber = {
  plural?: Maybe<SubjunctivePerson>;
  singular?: Maybe<SubjunctivePerson>;
};

export type SubjunctivePerson = {
  first?: Maybe<Array<Scalars['String']>>;
  second?: Maybe<Array<Scalars['String']>>;
  third?: Maybe<Array<Scalars['String']>>;
};

export type SubjunctiveTense = {
  imperfect?: Maybe<SubjunctiveNumber>;
  perfect?: Maybe<SubjunctiveNumber>;
  pluperfect?: Maybe<SubjunctiveNumber>;
  present?: Maybe<SubjunctiveNumber>;
};

export type Supine = {
  ablative?: Maybe<Array<Scalars['String']>>;
  accusative?: Maybe<Array<Scalars['String']>>;
};

export type Text = {
  author: Author;
  book?: Maybe<Book>;
  id: Scalars['ID'];
  lines: Array<Line>;
  linesSlice?: Maybe<Array<Line>>;
  title: Scalars['String'];
};


export type TextLinesSliceArgs = {
  end?: Maybe<Scalars['Float']>;
  start?: Maybe<Scalars['Float']>;
};

export type Translation = {
  entry: Entry;
  id: Scalars['ID'];
  translation: Scalars['String'];
};

export type Uninflected = {
  other: Scalars['String'];
};

export type User = {
  bookmarks?: Maybe<Array<Entry>>;
  createdAt: Scalars['DateTime'];
  customTexts?: Maybe<Array<CustomText>>;
  email: Scalars['String'];
  facebookId?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  settings?: Maybe<Settings>;
  updatedAt: Scalars['DateTime'];
};

export type VerbForms = {
  imperative?: Maybe<Imperative>;
  indicative?: Maybe<Indicative>;
  nonFinite?: Maybe<NonFinite>;
  subjunctive?: Maybe<Subjunctive>;
  verbalNoun?: Maybe<VerbalNoun>;
};

export type VerbInflection = {
  conjugation: Scalars['String'];
  other: Scalars['String'];
};

export type VerbalNoun = {
  gerund?: Maybe<Gerund>;
  supine?: Maybe<Supine>;
};

export type Word = {
  entries: Array<Entry>;
  word: Scalars['String'];
};

export type BookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type BookmarksQuery = { bookmarks: Array<{ id: string, partOfSpeech: string, identifiers?: Maybe<Array<string>>, bookmarked?: Maybe<boolean>, isLatinSearchResult?: Maybe<boolean>, principalParts?: Maybe<Array<{ name: string, text: Array<string> }>>, inflection?: Maybe<{ declension: string, degree: string, other: string } | { type: string, degree: string } | { declension: string, gender: string, other: string } | { case: string, other: string } | { other: string } | { conjugation: string, other: string }>, translations?: Maybe<Array<{ id: string, translation: string }>>, forms?: Maybe<{ masculine?: Maybe<{ nominative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, feminine?: Maybe<{ nominative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, neuter?: Maybe<{ nominative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }> } | { positive?: Maybe<Array<string>>, comparative?: Maybe<Array<string>>, superlative?: Maybe<Array<string>> } | { nominative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> } | { indicative?: Maybe<{ active?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, subjunctive?: Maybe<{ active?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, imperative?: Maybe<{ active?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ second?: Maybe<Array<string>> }>, plural?: Maybe<{ second?: Maybe<Array<string>> }> }>, future?: Maybe<{ singular?: Maybe<{ second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ second?: Maybe<Array<string>> }>, plural?: Maybe<{ second?: Maybe<Array<string>> }> }>, future?: Maybe<{ singular?: Maybe<{ second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ third?: Maybe<Array<string>> }> }> }> }>, nonFinite?: Maybe<{ infinitive?: Maybe<{ active?: Maybe<{ present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }>, participle?: Maybe<{ active?: Maybe<{ present?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }> }>, verbalNoun?: Maybe<{ gerund?: Maybe<{ genitive?: Maybe<Array<string>>, dative?: Maybe<Array<string>>, accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }>, supine?: Maybe<{ accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }> }> }> }> };

export type EntriesQueryVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type EntriesQuery = { entries: Array<{ id: string, partOfSpeech: string, identifiers?: Maybe<Array<string>>, bookmarked?: Maybe<boolean>, isLatinSearchResult?: Maybe<boolean>, principalParts?: Maybe<Array<{ name: string, text: Array<string> }>>, inflection?: Maybe<{ declension: string, degree: string, other: string } | { type: string, degree: string } | { declension: string, gender: string, other: string } | { case: string, other: string } | { other: string } | { conjugation: string, other: string }>, translations?: Maybe<Array<{ id: string, translation: string }>>, forms?: Maybe<{ masculine?: Maybe<{ nominative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, feminine?: Maybe<{ nominative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, neuter?: Maybe<{ nominative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }> } | { positive?: Maybe<Array<string>>, comparative?: Maybe<Array<string>>, superlative?: Maybe<Array<string>> } | { nominative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> } | { indicative?: Maybe<{ active?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, subjunctive?: Maybe<{ active?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, imperative?: Maybe<{ active?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ second?: Maybe<Array<string>> }>, plural?: Maybe<{ second?: Maybe<Array<string>> }> }>, future?: Maybe<{ singular?: Maybe<{ second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ second?: Maybe<Array<string>> }>, plural?: Maybe<{ second?: Maybe<Array<string>> }> }>, future?: Maybe<{ singular?: Maybe<{ second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ third?: Maybe<Array<string>> }> }> }> }>, nonFinite?: Maybe<{ infinitive?: Maybe<{ active?: Maybe<{ present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }>, participle?: Maybe<{ active?: Maybe<{ present?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }> }>, verbalNoun?: Maybe<{ gerund?: Maybe<{ genitive?: Maybe<Array<string>>, dative?: Maybe<Array<string>>, accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }>, supine?: Maybe<{ accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }> }> }> }> };

export type BookmarkMutationVariables = Exact<{
  entryId: Scalars['String'];
}>;


export type BookmarkMutation = { bookmark: boolean };

export type UnbookmarkMutationVariables = Exact<{
  entryId: Scalars['String'];
}>;


export type UnbookmarkMutation = { unbookmark: boolean };

export type SearchQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchQuery = { search: Array<{ id: string, partOfSpeech: string, identifiers?: Maybe<Array<string>>, bookmarked?: Maybe<boolean>, isLatinSearchResult?: Maybe<boolean>, principalParts?: Maybe<Array<{ name: string, text: Array<string> }>>, inflection?: Maybe<{ declension: string, degree: string, other: string } | { type: string, degree: string } | { declension: string, gender: string, other: string } | { case: string, other: string } | { other: string } | { conjugation: string, other: string }>, translations?: Maybe<Array<{ id: string, translation: string }>>, forms?: Maybe<{ masculine?: Maybe<{ nominative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, feminine?: Maybe<{ nominative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, neuter?: Maybe<{ nominative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }> } | { positive?: Maybe<Array<string>>, comparative?: Maybe<Array<string>>, superlative?: Maybe<Array<string>> } | { nominative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> } | { indicative?: Maybe<{ active?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, subjunctive?: Maybe<{ active?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ singular?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, imperative?: Maybe<{ active?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ second?: Maybe<Array<string>> }>, plural?: Maybe<{ second?: Maybe<Array<string>> }> }>, future?: Maybe<{ singular?: Maybe<{ second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ present?: Maybe<{ singular?: Maybe<{ second?: Maybe<Array<string>> }>, plural?: Maybe<{ second?: Maybe<Array<string>> }> }>, future?: Maybe<{ singular?: Maybe<{ second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ third?: Maybe<Array<string>> }> }> }> }>, nonFinite?: Maybe<{ infinitive?: Maybe<{ active?: Maybe<{ present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }>, participle?: Maybe<{ active?: Maybe<{ present?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }> }>, verbalNoun?: Maybe<{ gerund?: Maybe<{ genitive?: Maybe<Array<string>>, dative?: Maybe<Array<string>>, accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }>, supine?: Maybe<{ accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }> }> }> }> };

export type FacebookQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type FacebookQuery = { facebook: { id: string, email: string, facebookId?: Maybe<string> } };

export type GoogleQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type GoogleQuery = { google: { id: string, email: string, googleId?: Maybe<string> } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { logout: boolean };

export type UnregisterMutationVariables = Exact<{ [key: string]: never; }>;


export type UnregisterMutation = { unregister: boolean };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { user?: Maybe<{ id: string, email: string, googleId?: Maybe<string>, facebookId?: Maybe<string>, settings?: Maybe<{ theme?: Maybe<string>, fontSize?: Maybe<number>, formsExpandedDefault?: Maybe<boolean>, translationsExpandedDefault?: Maybe<boolean>, dictionaryMacronized?: Maybe<boolean>, literatureMacronized?: Maybe<boolean> }> }> };

export type SetSettingsMutationVariables = Exact<{
  settings: SettingsInput;
}>;


export type SetSettingsMutation = { setSettings: { theme?: Maybe<string>, fontSize?: Maybe<number>, formsExpandedDefault?: Maybe<boolean>, translationsExpandedDefault?: Maybe<boolean>, dictionaryMacronized?: Maybe<boolean>, literatureMacronized?: Maybe<boolean> } };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { settings: { theme?: Maybe<string>, fontSize?: Maybe<number>, formsExpandedDefault?: Maybe<boolean>, translationsExpandedDefault?: Maybe<boolean>, dictionaryMacronized?: Maybe<boolean>, literatureMacronized?: Maybe<boolean> } };

export type CreateCustomTextMutationVariables = Exact<{
  id: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
}>;


export type CreateCustomTextMutation = { createCustomText: { id: string, title: string, text: string } };

export type DeleteCustomTextMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCustomTextMutation = { deleteCustomText: boolean };

export type CustomTextQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CustomTextQuery = { customText: { id: string, title: string, text: string } };

export type CustomTextsQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomTextsQuery = { customTexts: Array<{ id: string, title: string, text: string }> };

export type FindTextQueryVariables = Exact<{
  author: Scalars['String'];
  book?: Maybe<Scalars['String']>;
  title: Scalars['String'];
}>;


export type FindTextQuery = { findText: { id: string, title: string, lines: Array<{ id: string, line: string, lineNumber: number, lineLabel: string }>, book?: Maybe<{ id: string, title: string }>, author: { id: string, name: string } } };

export type AuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthorsQuery = { authors: Array<{ id: string, name: string, books?: Maybe<Array<{ id: string, title: string, texts: Array<{ id: string, title: string }> }>>, texts: Array<{ id: string, title: string }> }> };

export type TextQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TextQuery = { text: { id: string, title: string, lines: Array<{ id: string, line: string, lineNumber: number, lineLabel: string }>, book?: Maybe<{ id: string, title: string }>, author: { id: string, name: string } } };

export type TextIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type TextIdsQuery = { textIds: Array<string> };

export type TextsQueryVariables = Exact<{ [key: string]: never; }>;


export type TextsQuery = { texts: Array<{ id: string, title: string, author: { id: string, name: string }, book?: Maybe<{ id: string, title: string }> }> };

export const AllPrincipalParts = gql`
    fragment AllPrincipalParts on PrincipalPart {
  name
  text
}
    `;
export const AllNounInflections = gql`
    fragment AllNounInflections on NounInflection {
  declension
  gender
  other
}
    `;
export const AllVerbInflections = gql`
    fragment AllVerbInflections on VerbInflection {
  conjugation
  other
}
    `;
export const AllAdjectiveInflections = gql`
    fragment AllAdjectiveInflections on AdjectiveInflection {
  declension
  degree
  other
}
    `;
export const AllAdverbInflections = gql`
    fragment AllAdverbInflections on AdverbInflection {
  type
  degree
}
    `;
export const AllPrepositionInflections = gql`
    fragment AllPrepositionInflections on PrepositionInflection {
  case
  other
}
    `;
export const AllUninflected = gql`
    fragment AllUninflected on Uninflected {
  other
}
    `;
export const AllInflections = gql`
    fragment AllInflections on Inflection {
  ... on NounInflection {
    ...AllNounInflections
  }
  ... on VerbInflection {
    ...AllVerbInflections
  }
  ... on AdjectiveInflection {
    ...AllAdjectiveInflections
  }
  ... on AdverbInflection {
    ...AllAdverbInflections
  }
  ... on PrepositionInflection {
    ...AllPrepositionInflections
  }
  ... on Uninflected {
    ...AllUninflected
  }
}
    ${AllNounInflections}
${AllVerbInflections}
${AllAdjectiveInflections}
${AllAdverbInflections}
${AllPrepositionInflections}
${AllUninflected}`;
export const AllTranslations = gql`
    fragment AllTranslations on Translation {
  id
  translation
}
    `;
export const AllNounNumbers = gql`
    fragment AllNounNumbers on NounNumber {
  singular
  plural
}
    `;
export const AllNounForms = gql`
    fragment AllNounForms on NounForms {
  nominative {
    ...AllNounNumbers
  }
  genitive {
    ...AllNounNumbers
  }
  dative {
    ...AllNounNumbers
  }
  accusative {
    ...AllNounNumbers
  }
  ablative {
    ...AllNounNumbers
  }
  vocative {
    ...AllNounNumbers
  }
  locative {
    ...AllNounNumbers
  }
}
    ${AllNounNumbers}`;
export const AllIndicativePerson = gql`
    fragment AllIndicativePerson on IndicativePerson {
  first
  second
  third
}
    `;
export const AllIndicativeNumber = gql`
    fragment AllIndicativeNumber on IndicativeNumber {
  singular {
    ...AllIndicativePerson
  }
  plural {
    ...AllIndicativePerson
  }
}
    ${AllIndicativePerson}`;
export const AllIndicativeTense = gql`
    fragment AllIndicativeTense on IndicativeTense {
  present {
    ...AllIndicativeNumber
  }
  imperfect {
    ...AllIndicativeNumber
  }
  future {
    ...AllIndicativeNumber
  }
  perfect {
    ...AllIndicativeNumber
  }
  pluperfect {
    ...AllIndicativeNumber
  }
  futurePerfect {
    ...AllIndicativeNumber
  }
}
    ${AllIndicativeNumber}`;
export const AllIndicative = gql`
    fragment AllIndicative on Indicative {
  active {
    ...AllIndicativeTense
  }
  passive {
    ...AllIndicativeTense
  }
}
    ${AllIndicativeTense}`;
export const AllSubjunctivePerson = gql`
    fragment AllSubjunctivePerson on SubjunctivePerson {
  first
  second
  third
}
    `;
export const AllSubjunctiveNumber = gql`
    fragment AllSubjunctiveNumber on SubjunctiveNumber {
  singular {
    ...AllSubjunctivePerson
  }
  plural {
    ...AllSubjunctivePerson
  }
}
    ${AllSubjunctivePerson}`;
export const AllSubjunctiveTense = gql`
    fragment AllSubjunctiveTense on SubjunctiveTense {
  present {
    ...AllSubjunctiveNumber
  }
  imperfect {
    ...AllSubjunctiveNumber
  }
  perfect {
    ...AllSubjunctiveNumber
  }
  pluperfect {
    ...AllSubjunctiveNumber
  }
}
    ${AllSubjunctiveNumber}`;
export const AllSubjunctive = gql`
    fragment AllSubjunctive on Subjunctive {
  active {
    ...AllSubjunctiveTense
  }
  passive {
    ...AllSubjunctiveTense
  }
}
    ${AllSubjunctiveTense}`;
export const AllImperativeSecond = gql`
    fragment AllImperativeSecond on ImperativeSecond {
  second
}
    `;
export const AllImperativePresent = gql`
    fragment AllImperativePresent on ImperativePresent {
  singular {
    ...AllImperativeSecond
  }
  plural {
    ...AllImperativeSecond
  }
}
    ${AllImperativeSecond}`;
export const AllImperativeSecondThird = gql`
    fragment AllImperativeSecondThird on ImperativeSecondThird {
  second
  third
}
    `;
export const AllImperativeActiveFuture = gql`
    fragment AllImperativeActiveFuture on ImperativeActiveFuture {
  singular {
    ...AllImperativeSecondThird
  }
  plural {
    ...AllImperativeSecondThird
  }
}
    ${AllImperativeSecondThird}`;
export const AllImperativeActive = gql`
    fragment AllImperativeActive on ImperativeActive {
  present {
    ...AllImperativePresent
  }
  future {
    ...AllImperativeActiveFuture
  }
}
    ${AllImperativePresent}
${AllImperativeActiveFuture}`;
export const AllImperativeThird = gql`
    fragment AllImperativeThird on ImperativeThird {
  third
}
    `;
export const AllImperativePassiveFuture = gql`
    fragment AllImperativePassiveFuture on ImperativePassiveFuture {
  singular {
    ...AllImperativeSecondThird
  }
  plural {
    ...AllImperativeThird
  }
}
    ${AllImperativeSecondThird}
${AllImperativeThird}`;
export const AllImperativePassive = gql`
    fragment AllImperativePassive on ImperativePassive {
  present {
    ...AllImperativePresent
  }
  future {
    ...AllImperativePassiveFuture
  }
}
    ${AllImperativePresent}
${AllImperativePassiveFuture}`;
export const AllImperative = gql`
    fragment AllImperative on Imperative {
  active {
    ...AllImperativeActive
  }
  passive {
    ...AllImperativePassive
  }
}
    ${AllImperativeActive}
${AllImperativePassive}`;
export const AllNonFinitePresentPerfectFuture = gql`
    fragment AllNonFinitePresentPerfectFuture on NonFinitePresentPerfectFuture {
  present
  perfect
  future
}
    `;
export const AllNonFiniteInfinitive = gql`
    fragment AllNonFiniteInfinitive on NonFiniteInfinitive {
  active {
    ...AllNonFinitePresentPerfectFuture
  }
  passive {
    ...AllNonFinitePresentPerfectFuture
  }
}
    ${AllNonFinitePresentPerfectFuture}`;
export const AllNonFinitePresentFuture = gql`
    fragment AllNonFinitePresentFuture on NonFinitePresentFuture {
  present
  future
}
    `;
export const AllNonFinitePerfectFuture = gql`
    fragment AllNonFinitePerfectFuture on NonFinitePerfectFuture {
  perfect
  future
}
    `;
export const AllNonFiniteParticiple = gql`
    fragment AllNonFiniteParticiple on NonFiniteParticiple {
  active {
    ...AllNonFinitePresentFuture
  }
  passive {
    ...AllNonFinitePerfectFuture
  }
}
    ${AllNonFinitePresentFuture}
${AllNonFinitePerfectFuture}`;
export const AllNonFinite = gql`
    fragment AllNonFinite on NonFinite {
  infinitive {
    ...AllNonFiniteInfinitive
  }
  participle {
    ...AllNonFiniteParticiple
  }
}
    ${AllNonFiniteInfinitive}
${AllNonFiniteParticiple}`;
export const AllGerund = gql`
    fragment AllGerund on Gerund {
  genitive
  dative
  accusative
  ablative
}
    `;
export const AllSupine = gql`
    fragment AllSupine on Supine {
  accusative
  ablative
}
    `;
export const AllVerbalNoun = gql`
    fragment AllVerbalNoun on VerbalNoun {
  gerund {
    ...AllGerund
  }
  supine {
    ...AllSupine
  }
}
    ${AllGerund}
${AllSupine}`;
export const AllVerbForms = gql`
    fragment AllVerbForms on VerbForms {
  indicative {
    ...AllIndicative
  }
  subjunctive {
    ...AllSubjunctive
  }
  imperative {
    ...AllImperative
  }
  nonFinite {
    ...AllNonFinite
  }
  verbalNoun {
    ...AllVerbalNoun
  }
}
    ${AllIndicative}
${AllSubjunctive}
${AllImperative}
${AllNonFinite}
${AllVerbalNoun}`;
export const AllAdjectiveNumber = gql`
    fragment AllAdjectiveNumber on AdjectiveNumber {
  singular
  plural
}
    `;
export const AllAdjectiveCase = gql`
    fragment AllAdjectiveCase on AdjectiveCase {
  nominative {
    ...AllAdjectiveNumber
  }
  genitive {
    ...AllAdjectiveNumber
  }
  dative {
    ...AllAdjectiveNumber
  }
  accusative {
    ...AllAdjectiveNumber
  }
  ablative {
    ...AllAdjectiveNumber
  }
  vocative {
    ...AllAdjectiveNumber
  }
  locative {
    ...AllAdjectiveNumber
  }
}
    ${AllAdjectiveNumber}`;
export const AllAdjectiveForms = gql`
    fragment AllAdjectiveForms on AdjectiveForms {
  masculine {
    ...AllAdjectiveCase
  }
  feminine {
    ...AllAdjectiveCase
  }
  neuter {
    ...AllAdjectiveCase
  }
}
    ${AllAdjectiveCase}`;
export const AllAdverbForms = gql`
    fragment AllAdverbForms on AdverbForms {
  positive
  comparative
  superlative
}
    `;
export const AllForms = gql`
    fragment AllForms on Forms {
  ... on NounForms {
    ...AllNounForms
  }
  ... on VerbForms {
    ...AllVerbForms
  }
  ... on AdjectiveForms {
    ...AllAdjectiveForms
  }
  ... on AdverbForms {
    ...AllAdverbForms
  }
}
    ${AllNounForms}
${AllVerbForms}
${AllAdjectiveForms}
${AllAdverbForms}`;
export const AllEntry = gql`
    fragment AllEntry on Entry {
  id
  partOfSpeech
  principalParts {
    ...AllPrincipalParts
  }
  inflection {
    ...AllInflections
  }
  translations {
    ...AllTranslations
  }
  forms {
    ...AllForms
  }
  identifiers
  bookmarked
  isLatinSearchResult
}
    ${AllPrincipalParts}
${AllInflections}
${AllTranslations}
${AllForms}`;
export const AllSettings = gql`
    fragment AllSettings on Settings {
  theme
  fontSize
  formsExpandedDefault
  translationsExpandedDefault
  dictionaryMacronized
  literatureMacronized
}
    `;
export const Bookmarks = gql`
    query Bookmarks {
  bookmarks {
    ...AllEntry
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
${AllAdverbForms}`;
export const Entries = gql`
    query Entries($ids: [String!]!) {
  entries(ids: $ids) {
    ...AllEntry
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
${AllAdverbForms}`;
export const Bookmark = gql`
    mutation Bookmark($entryId: String!) {
  bookmark(entryId: $entryId)
}
    `;
export const Unbookmark = gql`
    mutation Unbookmark($entryId: String!) {
  unbookmark(entryId: $entryId)
}
    `;
export const Search = gql`
    query Search($search: String!) {
  search(search: $search) {
    ...AllEntry
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
${AllAdverbForms}`;
export const Facebook = gql`
    query Facebook($code: String!) {
  facebook(code: $code) {
    id
    email
    facebookId
  }
}
    `;
export const Google = gql`
    query Google($code: String!) {
  google(code: $code) {
    id
    email
    googleId
  }
}
    `;
export const Logout = gql`
    query Logout {
  logout
}
    `;
export const Unregister = gql`
    mutation Unregister {
  unregister
}
    `;
export const User = gql`
    query User {
  user {
    id
    email
    googleId
    facebookId
    settings {
      ...AllSettings
    }
  }
}
    ${AllSettings}`;
export const SetSettings = gql`
    mutation SetSettings($settings: SettingsInput!) {
  setSettings(settings: $settings) {
    ...AllSettings
  }
}
    ${AllSettings}`;
export const Settings = gql`
    query Settings {
  settings {
    ...AllSettings
  }
}
    ${AllSettings}`;
export const CreateCustomText = gql`
    mutation CreateCustomText($id: String!, $title: String!, $text: String!) {
  createCustomText(id: $id, title: $title, text: $text) {
    id
    title
    text
  }
}
    `;
export const DeleteCustomText = gql`
    mutation DeleteCustomText($id: String!) {
  deleteCustomText(id: $id)
}
    `;
export const CustomText = gql`
    query CustomText($id: String!) {
  customText(id: $id) {
    id
    title
    text
  }
}
    `;
export const CustomTexts = gql`
    query CustomTexts {
  customTexts {
    id
    title
    text
  }
}
    `;
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
    `;
export const Authors = gql`
    query Authors {
  authors {
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
    `;
export const Text = gql`
    query Text($id: String!) {
  text(id: $id) {
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
    `;
export const TextIds = gql`
    query TextIds {
  textIds
}
    `;
export const Texts = gql`
    query Texts {
  texts {
    id
    title
    author {
      id
      name
    }
    book {
      id
      title
    }
  }
}
    `;
export const AllPrincipalPartsFragmentDoc = `
    fragment AllPrincipalParts on PrincipalPart {
  name
  text
}
    `;
export const AllNounInflectionsFragmentDoc = `
    fragment AllNounInflections on NounInflection {
  declension
  gender
  other
}
    `;
export const AllVerbInflectionsFragmentDoc = `
    fragment AllVerbInflections on VerbInflection {
  conjugation
  other
}
    `;
export const AllAdjectiveInflectionsFragmentDoc = `
    fragment AllAdjectiveInflections on AdjectiveInflection {
  declension
  degree
  other
}
    `;
export const AllAdverbInflectionsFragmentDoc = `
    fragment AllAdverbInflections on AdverbInflection {
  type
  degree
}
    `;
export const AllPrepositionInflectionsFragmentDoc = `
    fragment AllPrepositionInflections on PrepositionInflection {
  case
  other
}
    `;
export const AllUninflectedFragmentDoc = `
    fragment AllUninflected on Uninflected {
  other
}
    `;
export const AllInflectionsFragmentDoc = `
    fragment AllInflections on Inflection {
  ... on NounInflection {
    ...AllNounInflections
  }
  ... on VerbInflection {
    ...AllVerbInflections
  }
  ... on AdjectiveInflection {
    ...AllAdjectiveInflections
  }
  ... on AdverbInflection {
    ...AllAdverbInflections
  }
  ... on PrepositionInflection {
    ...AllPrepositionInflections
  }
  ... on Uninflected {
    ...AllUninflected
  }
}
    `;
export const AllTranslationsFragmentDoc = `
    fragment AllTranslations on Translation {
  id
  translation
}
    `;
export const AllNounNumbersFragmentDoc = `
    fragment AllNounNumbers on NounNumber {
  singular
  plural
}
    `;
export const AllNounFormsFragmentDoc = `
    fragment AllNounForms on NounForms {
  nominative {
    ...AllNounNumbers
  }
  genitive {
    ...AllNounNumbers
  }
  dative {
    ...AllNounNumbers
  }
  accusative {
    ...AllNounNumbers
  }
  ablative {
    ...AllNounNumbers
  }
  vocative {
    ...AllNounNumbers
  }
  locative {
    ...AllNounNumbers
  }
}
    `;
export const AllIndicativePersonFragmentDoc = `
    fragment AllIndicativePerson on IndicativePerson {
  first
  second
  third
}
    `;
export const AllIndicativeNumberFragmentDoc = `
    fragment AllIndicativeNumber on IndicativeNumber {
  singular {
    ...AllIndicativePerson
  }
  plural {
    ...AllIndicativePerson
  }
}
    `;
export const AllIndicativeTenseFragmentDoc = `
    fragment AllIndicativeTense on IndicativeTense {
  present {
    ...AllIndicativeNumber
  }
  imperfect {
    ...AllIndicativeNumber
  }
  future {
    ...AllIndicativeNumber
  }
  perfect {
    ...AllIndicativeNumber
  }
  pluperfect {
    ...AllIndicativeNumber
  }
  futurePerfect {
    ...AllIndicativeNumber
  }
}
    `;
export const AllIndicativeFragmentDoc = `
    fragment AllIndicative on Indicative {
  active {
    ...AllIndicativeTense
  }
  passive {
    ...AllIndicativeTense
  }
}
    `;
export const AllSubjunctivePersonFragmentDoc = `
    fragment AllSubjunctivePerson on SubjunctivePerson {
  first
  second
  third
}
    `;
export const AllSubjunctiveNumberFragmentDoc = `
    fragment AllSubjunctiveNumber on SubjunctiveNumber {
  singular {
    ...AllSubjunctivePerson
  }
  plural {
    ...AllSubjunctivePerson
  }
}
    `;
export const AllSubjunctiveTenseFragmentDoc = `
    fragment AllSubjunctiveTense on SubjunctiveTense {
  present {
    ...AllSubjunctiveNumber
  }
  imperfect {
    ...AllSubjunctiveNumber
  }
  perfect {
    ...AllSubjunctiveNumber
  }
  pluperfect {
    ...AllSubjunctiveNumber
  }
}
    `;
export const AllSubjunctiveFragmentDoc = `
    fragment AllSubjunctive on Subjunctive {
  active {
    ...AllSubjunctiveTense
  }
  passive {
    ...AllSubjunctiveTense
  }
}
    `;
export const AllImperativeSecondFragmentDoc = `
    fragment AllImperativeSecond on ImperativeSecond {
  second
}
    `;
export const AllImperativePresentFragmentDoc = `
    fragment AllImperativePresent on ImperativePresent {
  singular {
    ...AllImperativeSecond
  }
  plural {
    ...AllImperativeSecond
  }
}
    `;
export const AllImperativeSecondThirdFragmentDoc = `
    fragment AllImperativeSecondThird on ImperativeSecondThird {
  second
  third
}
    `;
export const AllImperativeActiveFutureFragmentDoc = `
    fragment AllImperativeActiveFuture on ImperativeActiveFuture {
  singular {
    ...AllImperativeSecondThird
  }
  plural {
    ...AllImperativeSecondThird
  }
}
    `;
export const AllImperativeActiveFragmentDoc = `
    fragment AllImperativeActive on ImperativeActive {
  present {
    ...AllImperativePresent
  }
  future {
    ...AllImperativeActiveFuture
  }
}
    `;
export const AllImperativeThirdFragmentDoc = `
    fragment AllImperativeThird on ImperativeThird {
  third
}
    `;
export const AllImperativePassiveFutureFragmentDoc = `
    fragment AllImperativePassiveFuture on ImperativePassiveFuture {
  singular {
    ...AllImperativeSecondThird
  }
  plural {
    ...AllImperativeThird
  }
}
    `;
export const AllImperativePassiveFragmentDoc = `
    fragment AllImperativePassive on ImperativePassive {
  present {
    ...AllImperativePresent
  }
  future {
    ...AllImperativePassiveFuture
  }
}
    `;
export const AllImperativeFragmentDoc = `
    fragment AllImperative on Imperative {
  active {
    ...AllImperativeActive
  }
  passive {
    ...AllImperativePassive
  }
}
    `;
export const AllNonFinitePresentPerfectFutureFragmentDoc = `
    fragment AllNonFinitePresentPerfectFuture on NonFinitePresentPerfectFuture {
  present
  perfect
  future
}
    `;
export const AllNonFiniteInfinitiveFragmentDoc = `
    fragment AllNonFiniteInfinitive on NonFiniteInfinitive {
  active {
    ...AllNonFinitePresentPerfectFuture
  }
  passive {
    ...AllNonFinitePresentPerfectFuture
  }
}
    `;
export const AllNonFinitePresentFutureFragmentDoc = `
    fragment AllNonFinitePresentFuture on NonFinitePresentFuture {
  present
  future
}
    `;
export const AllNonFinitePerfectFutureFragmentDoc = `
    fragment AllNonFinitePerfectFuture on NonFinitePerfectFuture {
  perfect
  future
}
    `;
export const AllNonFiniteParticipleFragmentDoc = `
    fragment AllNonFiniteParticiple on NonFiniteParticiple {
  active {
    ...AllNonFinitePresentFuture
  }
  passive {
    ...AllNonFinitePerfectFuture
  }
}
    `;
export const AllNonFiniteFragmentDoc = `
    fragment AllNonFinite on NonFinite {
  infinitive {
    ...AllNonFiniteInfinitive
  }
  participle {
    ...AllNonFiniteParticiple
  }
}
    `;
export const AllGerundFragmentDoc = `
    fragment AllGerund on Gerund {
  genitive
  dative
  accusative
  ablative
}
    `;
export const AllSupineFragmentDoc = `
    fragment AllSupine on Supine {
  accusative
  ablative
}
    `;
export const AllVerbalNounFragmentDoc = `
    fragment AllVerbalNoun on VerbalNoun {
  gerund {
    ...AllGerund
  }
  supine {
    ...AllSupine
  }
}
    `;
export const AllVerbFormsFragmentDoc = `
    fragment AllVerbForms on VerbForms {
  indicative {
    ...AllIndicative
  }
  subjunctive {
    ...AllSubjunctive
  }
  imperative {
    ...AllImperative
  }
  nonFinite {
    ...AllNonFinite
  }
  verbalNoun {
    ...AllVerbalNoun
  }
}
    `;
export const AllAdjectiveNumberFragmentDoc = `
    fragment AllAdjectiveNumber on AdjectiveNumber {
  singular
  plural
}
    `;
export const AllAdjectiveCaseFragmentDoc = `
    fragment AllAdjectiveCase on AdjectiveCase {
  nominative {
    ...AllAdjectiveNumber
  }
  genitive {
    ...AllAdjectiveNumber
  }
  dative {
    ...AllAdjectiveNumber
  }
  accusative {
    ...AllAdjectiveNumber
  }
  ablative {
    ...AllAdjectiveNumber
  }
  vocative {
    ...AllAdjectiveNumber
  }
  locative {
    ...AllAdjectiveNumber
  }
}
    `;
export const AllAdjectiveFormsFragmentDoc = `
    fragment AllAdjectiveForms on AdjectiveForms {
  masculine {
    ...AllAdjectiveCase
  }
  feminine {
    ...AllAdjectiveCase
  }
  neuter {
    ...AllAdjectiveCase
  }
}
    `;
export const AllAdverbFormsFragmentDoc = `
    fragment AllAdverbForms on AdverbForms {
  positive
  comparative
  superlative
}
    `;
export const AllFormsFragmentDoc = `
    fragment AllForms on Forms {
  ... on NounForms {
    ...AllNounForms
  }
  ... on VerbForms {
    ...AllVerbForms
  }
  ... on AdjectiveForms {
    ...AllAdjectiveForms
  }
  ... on AdverbForms {
    ...AllAdverbForms
  }
}
    `;
export const AllEntryFragmentDoc = `
    fragment AllEntry on Entry {
  id
  partOfSpeech
  principalParts {
    ...AllPrincipalParts
  }
  inflection {
    ...AllInflections
  }
  translations {
    ...AllTranslations
  }
  forms {
    ...AllForms
  }
  identifiers
  bookmarked
  isLatinSearchResult
}
    `;
export const AllSettingsFragmentDoc = `
    fragment AllSettings on Settings {
  theme
  fontSize
  formsExpandedDefault
  translationsExpandedDefault
  dictionaryMacronized
  literatureMacronized
}
    `;
export const BookmarksDocument = `
    query Bookmarks {
  bookmarks {
    ...AllEntry
  }
}
    `;
export const useBookmarksQuery = <
      TData = BookmarksQuery,
      TError = unknown
    >(
      variables?: BookmarksQueryVariables, 
      options?: UseQueryOptions<BookmarksQuery, TError, TData>
    ) => 
    useQuery<BookmarksQuery, TError, TData>(
      ['Bookmarks', variables],
      fetcher<BookmarksQuery, BookmarksQueryVariables>(BookmarksDocument, variables),
      options
    );
useBookmarksQuery.getKey = (variables?: BookmarksQueryVariables) => ['Bookmarks', variables];

useBookmarksQuery.fetcher = (variables?: BookmarksQueryVariables) => fetcher<BookmarksQuery, BookmarksQueryVariables>(BookmarksDocument, variables);
export const EntriesDocument = `
    query Entries(`;
export const useEntriesQuery = <
      TData = EntriesQuery,
      TError = unknown
    >(
      variables: EntriesQueryVariables, 
      options?: UseQueryOptions<EntriesQuery, TError, TData>
    ) => 
    useQuery<EntriesQuery, TError, TData>(
      ['Entries', variables],
      fetcher<EntriesQuery, EntriesQueryVariables>(EntriesDocument, variables),
      options
    );
useEntriesQuery.getKey = (variables: EntriesQueryVariables) => ['Entries', variables];

useEntriesQuery.fetcher = (variables: EntriesQueryVariables) => fetcher<EntriesQuery, EntriesQueryVariables>(EntriesDocument, variables);
export const BookmarkDocument = `
    mutation Bookmark($entryId: String!) {
  bookmark(entryId: $entryId)
}
    `;
export const useBookmarkMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<BookmarkMutation, TError, BookmarkMutationVariables, TContext>) => 
    useMutation<BookmarkMutation, TError, BookmarkMutationVariables, TContext>(
      (variables?: BookmarkMutationVariables) => fetcher<BookmarkMutation, BookmarkMutationVariables>(BookmarkDocument, variables)(),
      options
    );
export const UnbookmarkDocument = `
    mutation Unbookmark($entryId: String!) {
  unbookmark(entryId: $entryId)
}
    `;
export const useUnbookmarkMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UnbookmarkMutation, TError, UnbookmarkMutationVariables, TContext>) => 
    useMutation<UnbookmarkMutation, TError, UnbookmarkMutationVariables, TContext>(
      (variables?: UnbookmarkMutationVariables) => fetcher<UnbookmarkMutation, UnbookmarkMutationVariables>(UnbookmarkDocument, variables)(),
      options
    );
export const SearchDocument = `
    query Search($search: String!) {
  search(search: $search) {
    ...AllEntry
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
${AllAdverbFormsFragmentDoc}`;
export const useSearchQuery = <
      TData = SearchQuery,
      TError = unknown
    >(
      variables: SearchQueryVariables, 
      options?: UseQueryOptions<SearchQuery, TError, TData>
    ) => 
    useQuery<SearchQuery, TError, TData>(
      ['Search', variables],
      fetcher<SearchQuery, SearchQueryVariables>(SearchDocument, variables),
      options
    );
useSearchQuery.getKey = (variables: SearchQueryVariables) => ['Search', variables];

useSearchQuery.fetcher = (variables: SearchQueryVariables) => fetcher<SearchQuery, SearchQueryVariables>(SearchDocument, variables);
export const FacebookDocument = `
    query Facebook($code: String!) {
  facebook(code: $code) {
    id
    email
    facebookId
  }
}
    `;
export const useFacebookQuery = <
      TData = FacebookQuery,
      TError = unknown
    >(
      variables: FacebookQueryVariables, 
      options?: UseQueryOptions<FacebookQuery, TError, TData>
    ) => 
    useQuery<FacebookQuery, TError, TData>(
      ['Facebook', variables],
      fetcher<FacebookQuery, FacebookQueryVariables>(FacebookDocument, variables),
      options
    );
useFacebookQuery.getKey = (variables: FacebookQueryVariables) => ['Facebook', variables];

useFacebookQuery.fetcher = (variables: FacebookQueryVariables) => fetcher<FacebookQuery, FacebookQueryVariables>(FacebookDocument, variables);
export const GoogleDocument = `
    query Google($code: String!) {
  google(code: $code) {
    id
    email
    googleId
  }
}
    `;
export const useGoogleQuery = <
      TData = GoogleQuery,
      TError = unknown
    >(
      variables: GoogleQueryVariables, 
      options?: UseQueryOptions<GoogleQuery, TError, TData>
    ) => 
    useQuery<GoogleQuery, TError, TData>(
      ['Google', variables],
      fetcher<GoogleQuery, GoogleQueryVariables>(GoogleDocument, variables),
      options
    );
useGoogleQuery.getKey = (variables: GoogleQueryVariables) => ['Google', variables];

useGoogleQuery.fetcher = (variables: GoogleQueryVariables) => fetcher<GoogleQuery, GoogleQueryVariables>(GoogleDocument, variables);
export const LogoutDocument = `
    query Logout {
  logout
}
    `;
export const useLogoutQuery = <
      TData = LogoutQuery,
      TError = unknown
    >(
      variables?: LogoutQueryVariables, 
      options?: UseQueryOptions<LogoutQuery, TError, TData>
    ) => 
    useQuery<LogoutQuery, TError, TData>(
      ['Logout', variables],
      fetcher<LogoutQuery, LogoutQueryVariables>(LogoutDocument, variables),
      options
    );
useLogoutQuery.getKey = (variables?: LogoutQueryVariables) => ['Logout', variables];

useLogoutQuery.fetcher = (variables?: LogoutQueryVariables) => fetcher<LogoutQuery, LogoutQueryVariables>(LogoutDocument, variables);
export const UnregisterDocument = `
    mutation Unregister {
  unregister
}
    `;
export const useUnregisterMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UnregisterMutation, TError, UnregisterMutationVariables, TContext>) => 
    useMutation<UnregisterMutation, TError, UnregisterMutationVariables, TContext>(
      (variables?: UnregisterMutationVariables) => fetcher<UnregisterMutation, UnregisterMutationVariables>(UnregisterDocument, variables)(),
      options
    );
export const UserDocument = `
    query User {
  user {
    id
    email
    googleId
    facebookId
    settings {
      ...AllSettings
    }
  }
}
    ${AllSettingsFragmentDoc}`;
export const useUserQuery = <
      TData = UserQuery,
      TError = unknown
    >(
      variables?: UserQueryVariables, 
      options?: UseQueryOptions<UserQuery, TError, TData>
    ) => 
    useQuery<UserQuery, TError, TData>(
      ['User', variables],
      fetcher<UserQuery, UserQueryVariables>(UserDocument, variables),
      options
    );
useUserQuery.getKey = (variables?: UserQueryVariables) => ['User', variables];

useUserQuery.fetcher = (variables?: UserQueryVariables) => fetcher<UserQuery, UserQueryVariables>(UserDocument, variables);
export const SetSettingsDocument = `
    mutation SetSettings($settings: SettingsInput!) {
  setSettings(settings: $settings) {
    ...AllSettings
  }
}
    ${AllSettingsFragmentDoc}`;
export const useSetSettingsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SetSettingsMutation, TError, SetSettingsMutationVariables, TContext>) => 
    useMutation<SetSettingsMutation, TError, SetSettingsMutationVariables, TContext>(
      (variables?: SetSettingsMutationVariables) => fetcher<SetSettingsMutation, SetSettingsMutationVariables>(SetSettingsDocument, variables)(),
      options
    );
export const SettingsDocument = `
    query Settings {
  settings {
    ...AllSettings
  }
}
    ${AllSettingsFragmentDoc}`;
export const useSettingsQuery = <
      TData = SettingsQuery,
      TError = unknown
    >(
      variables?: SettingsQueryVariables, 
      options?: UseQueryOptions<SettingsQuery, TError, TData>
    ) => 
    useQuery<SettingsQuery, TError, TData>(
      ['Settings', variables],
      fetcher<SettingsQuery, SettingsQueryVariables>(SettingsDocument, variables),
      options
    );
useSettingsQuery.getKey = (variables?: SettingsQueryVariables) => ['Settings', variables];

useSettingsQuery.fetcher = (variables?: SettingsQueryVariables) => fetcher<SettingsQuery, SettingsQueryVariables>(SettingsDocument, variables);
export const CreateCustomTextDocument = `
    mutation CreateCustomText($id: String!, $title: String!, $text: String!) {
  createCustomText(id: $id, title: $title, text: $text) {
    id
    title
    text
  }
}
    `;
export const useCreateCustomTextMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCustomTextMutation, TError, CreateCustomTextMutationVariables, TContext>) => 
    useMutation<CreateCustomTextMutation, TError, CreateCustomTextMutationVariables, TContext>(
      (variables?: CreateCustomTextMutationVariables) => fetcher<CreateCustomTextMutation, CreateCustomTextMutationVariables>(CreateCustomTextDocument, variables)(),
      options
    );
export const DeleteCustomTextDocument = `
    mutation DeleteCustomText($id: String!) {
  deleteCustomText(id: $id)
}
    `;
export const useDeleteCustomTextMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteCustomTextMutation, TError, DeleteCustomTextMutationVariables, TContext>) => 
    useMutation<DeleteCustomTextMutation, TError, DeleteCustomTextMutationVariables, TContext>(
      (variables?: DeleteCustomTextMutationVariables) => fetcher<DeleteCustomTextMutation, DeleteCustomTextMutationVariables>(DeleteCustomTextDocument, variables)(),
      options
    );
export const CustomTextDocument = `
    query CustomText($id: String!) {
  customText(id: $id) {
    id
    title
    text
  }
}
    `;
export const useCustomTextQuery = <
      TData = CustomTextQuery,
      TError = unknown
    >(
      variables: CustomTextQueryVariables, 
      options?: UseQueryOptions<CustomTextQuery, TError, TData>
    ) => 
    useQuery<CustomTextQuery, TError, TData>(
      ['CustomText', variables],
      fetcher<CustomTextQuery, CustomTextQueryVariables>(CustomTextDocument, variables),
      options
    );
useCustomTextQuery.getKey = (variables: CustomTextQueryVariables) => ['CustomText', variables];

useCustomTextQuery.fetcher = (variables: CustomTextQueryVariables) => fetcher<CustomTextQuery, CustomTextQueryVariables>(CustomTextDocument, variables);
export const CustomTextsDocument = `
    query CustomTexts {
  customTexts {
    id
    title
    text
  }
}
    `;
export const useCustomTextsQuery = <
      TData = CustomTextsQuery,
      TError = unknown
    >(
      variables?: CustomTextsQueryVariables, 
      options?: UseQueryOptions<CustomTextsQuery, TError, TData>
    ) => 
    useQuery<CustomTextsQuery, TError, TData>(
      ['CustomTexts', variables],
      fetcher<CustomTextsQuery, CustomTextsQueryVariables>(CustomTextsDocument, variables),
      options
    );
useCustomTextsQuery.getKey = (variables?: CustomTextsQueryVariables) => ['CustomTexts', variables];

useCustomTextsQuery.fetcher = (variables?: CustomTextsQueryVariables) => fetcher<CustomTextsQuery, CustomTextsQueryVariables>(CustomTextsDocument, variables);
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
    `;
export const useFindTextQuery = <
      TData = FindTextQuery,
      TError = unknown
    >(
      variables: FindTextQueryVariables, 
      options?: UseQueryOptions<FindTextQuery, TError, TData>
    ) => 
    useQuery<FindTextQuery, TError, TData>(
      ['FindText', variables],
      fetcher<FindTextQuery, FindTextQueryVariables>(FindTextDocument, variables),
      options
    );
useFindTextQuery.getKey = (variables: FindTextQueryVariables) => ['FindText', variables];

useFindTextQuery.fetcher = (variables: FindTextQueryVariables) => fetcher<FindTextQuery, FindTextQueryVariables>(FindTextDocument, variables);
export const AuthorsDocument = `
    query Authors {
  authors {
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
    `;
export const useAuthorsQuery = <
      TData = AuthorsQuery,
      TError = unknown
    >(
      variables?: AuthorsQueryVariables, 
      options?: UseQueryOptions<AuthorsQuery, TError, TData>
    ) => 
    useQuery<AuthorsQuery, TError, TData>(
      ['Authors', variables],
      fetcher<AuthorsQuery, AuthorsQueryVariables>(AuthorsDocument, variables),
      options
    );
useAuthorsQuery.getKey = (variables?: AuthorsQueryVariables) => ['Authors', variables];

useAuthorsQuery.fetcher = (variables?: AuthorsQueryVariables) => fetcher<AuthorsQuery, AuthorsQueryVariables>(AuthorsDocument, variables);
export const TextDocument = `
    query Text($id: String!) {
  text(id: $id) {
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
    `;
export const useTextQuery = <
      TData = TextQuery,
      TError = unknown
    >(
      variables: TextQueryVariables, 
      options?: UseQueryOptions<TextQuery, TError, TData>
    ) => 
    useQuery<TextQuery, TError, TData>(
      ['Text', variables],
      fetcher<TextQuery, TextQueryVariables>(TextDocument, variables),
      options
    );
useTextQuery.getKey = (variables: TextQueryVariables) => ['Text', variables];

useTextQuery.fetcher = (variables: TextQueryVariables) => fetcher<TextQuery, TextQueryVariables>(TextDocument, variables);
export const TextIdsDocument = `
    query TextIds {
  textIds
}
    `;
export const useTextIdsQuery = <
      TData = TextIdsQuery,
      TError = unknown
    >(
      variables?: TextIdsQueryVariables, 
      options?: UseQueryOptions<TextIdsQuery, TError, TData>
    ) => 
    useQuery<TextIdsQuery, TError, TData>(
      ['TextIds', variables],
      fetcher<TextIdsQuery, TextIdsQueryVariables>(TextIdsDocument, variables),
      options
    );
useTextIdsQuery.getKey = (variables?: TextIdsQueryVariables) => ['TextIds', variables];

useTextIdsQuery.fetcher = (variables?: TextIdsQueryVariables) => fetcher<TextIdsQuery, TextIdsQueryVariables>(TextIdsDocument, variables);
export const TextsDocument = `
    query Texts {
  texts {
    id
    title
    author {
      id
      name
    }
    book {
      id
      title
    }
  }
}
    `;
export const useTextsQuery = <
      TData = TextsQuery,
      TError = unknown
    >(
      variables?: TextsQueryVariables, 
      options?: UseQueryOptions<TextsQuery, TError, TData>
    ) => 
    useQuery<TextsQuery, TError, TData>(
      ['Texts', variables],
      fetcher<TextsQuery, TextsQueryVariables>(TextsDocument, variables),
      options
    );
useTextsQuery.getKey = (variables?: TextsQueryVariables) => ['Texts', variables];

useTextsQuery.fetcher = (variables?: TextsQueryVariables) => fetcher<TextsQuery, TextsQueryVariables>(TextsDocument, variables);