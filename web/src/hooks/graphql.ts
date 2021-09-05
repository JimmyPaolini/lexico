import { clientEndpoint as endpointUrl } from '../pages/_app';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpointUrl as string, {
      method: "POST",
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
  __typename?: 'AdjectiveCase';
  ablative?: Maybe<AdjectiveNumber>;
  accusative?: Maybe<AdjectiveNumber>;
  dative?: Maybe<AdjectiveNumber>;
  genitive?: Maybe<AdjectiveNumber>;
  locative?: Maybe<AdjectiveNumber>;
  nominative?: Maybe<AdjectiveNumber>;
  vocative?: Maybe<AdjectiveNumber>;
};

export type AdjectiveForms = {
  __typename?: 'AdjectiveForms';
  feminine?: Maybe<AdjectiveCase>;
  masculine?: Maybe<AdjectiveCase>;
  neuter?: Maybe<AdjectiveCase>;
};

export type AdjectiveInflection = {
  __typename?: 'AdjectiveInflection';
  declension: Scalars['String'];
  degree: Scalars['String'];
  other: Scalars['String'];
};

export type AdjectiveNumber = {
  __typename?: 'AdjectiveNumber';
  plural?: Maybe<Array<Scalars['String']>>;
  singular?: Maybe<Array<Scalars['String']>>;
};

export type AdverbForms = {
  __typename?: 'AdverbForms';
  comparative?: Maybe<Array<Scalars['String']>>;
  positive?: Maybe<Array<Scalars['String']>>;
  superlative?: Maybe<Array<Scalars['String']>>;
};

export type AdverbInflection = {
  __typename?: 'AdverbInflection';
  degree: Scalars['String'];
  type: Scalars['String'];
};

export type Author = {
  __typename?: 'Author';
  books?: Maybe<Array<Book>>;
  id: Scalars['String'];
  name: Scalars['String'];
  texts: Array<Text>;
};

export type Book = {
  __typename?: 'Book';
  author: Author;
  id: Scalars['ID'];
  texts: Array<Text>;
  title: Scalars['String'];
};

export type CustomText = {
  __typename?: 'CustomText';
  id: Scalars['ID'];
  text: Scalars['String'];
  title: Scalars['String'];
  user: User;
};


export type Entry = {
  __typename?: 'Entry';
  bookmarked?: Maybe<Scalars['Boolean']>;
  etymology?: Maybe<Scalars['String']>;
  forms?: Maybe<Forms>;
  id: Scalars['ID'];
  identifiers?: Maybe<Array<Scalars['String']>>;
  inflection?: Maybe<Inflection>;
  partOfSpeech: Scalars['String'];
  principalParts?: Maybe<Array<PrincipalPart>>;
  pronunciation?: Maybe<Pronunciation>;
  translations?: Maybe<Array<Translation>>;
  users?: Maybe<Array<User>>;
  words: Array<Word>;
};

export type Forms = AdjectiveForms | AdverbForms | NounForms | VerbForms;

export type Gerund = {
  __typename?: 'Gerund';
  ablative?: Maybe<Array<Scalars['String']>>;
  accusative?: Maybe<Array<Scalars['String']>>;
  dative?: Maybe<Array<Scalars['String']>>;
  genitive?: Maybe<Array<Scalars['String']>>;
};

export type Imperative = {
  __typename?: 'Imperative';
  active?: Maybe<ImperativeActive>;
  passive?: Maybe<ImperativePassive>;
};

export type ImperativeActive = {
  __typename?: 'ImperativeActive';
  future?: Maybe<ImperativeActiveFuture>;
  present?: Maybe<ImperativePresent>;
};

export type ImperativeActiveFuture = {
  __typename?: 'ImperativeActiveFuture';
  plural?: Maybe<ImperativeSecondThird>;
  singular?: Maybe<ImperativeSecondThird>;
};

export type ImperativePassive = {
  __typename?: 'ImperativePassive';
  future?: Maybe<ImperativePassiveFuture>;
  present?: Maybe<ImperativePresent>;
};

export type ImperativePassiveFuture = {
  __typename?: 'ImperativePassiveFuture';
  plural?: Maybe<ImperativeThird>;
  singular?: Maybe<ImperativeSecondThird>;
};

export type ImperativePresent = {
  __typename?: 'ImperativePresent';
  plural?: Maybe<ImperativeSecond>;
  singular?: Maybe<ImperativeSecond>;
};

export type ImperativeSecond = {
  __typename?: 'ImperativeSecond';
  second?: Maybe<Array<Scalars['String']>>;
};

export type ImperativeSecondThird = {
  __typename?: 'ImperativeSecondThird';
  second?: Maybe<Array<Scalars['String']>>;
  third?: Maybe<Array<Scalars['String']>>;
};

export type ImperativeThird = {
  __typename?: 'ImperativeThird';
  third?: Maybe<Array<Scalars['String']>>;
};

export type Indicative = {
  __typename?: 'Indicative';
  active?: Maybe<IndicativeTense>;
  passive?: Maybe<IndicativeTense>;
};

export type IndicativeNumber = {
  __typename?: 'IndicativeNumber';
  plural?: Maybe<IndicativePerson>;
  singular?: Maybe<IndicativePerson>;
};

export type IndicativePerson = {
  __typename?: 'IndicativePerson';
  first?: Maybe<Array<Scalars['String']>>;
  second?: Maybe<Array<Scalars['String']>>;
  third?: Maybe<Array<Scalars['String']>>;
};

export type IndicativeTense = {
  __typename?: 'IndicativeTense';
  future?: Maybe<IndicativeNumber>;
  futurePerfect?: Maybe<IndicativeNumber>;
  imperfect?: Maybe<IndicativeNumber>;
  perfect?: Maybe<IndicativeNumber>;
  pluperfect?: Maybe<IndicativeNumber>;
  present?: Maybe<IndicativeNumber>;
};

export type Inflection = AdjectiveInflection | AdverbInflection | NounInflection | PrepositionInflection | Uninflected | VerbInflection;

export type Line = {
  __typename?: 'Line';
  id: Scalars['ID'];
  line: Scalars['String'];
  lineLabel: Scalars['String'];
  lineNumber: Scalars['Float'];
  text: Text;
};

export type Mutation = {
  __typename?: 'Mutation';
  bookmark: Scalars['Boolean'];
  comment: Scalars['Boolean'];
  createCustomText: CustomText;
  deleteCustomText: Scalars['Boolean'];
  recoverPassword: Scalars['Boolean'];
  register: User;
  resetPassword: Scalars['Boolean'];
  setSettings: Scalars['Boolean'];
  unbookmark: Scalars['Boolean'];
  unregister: Scalars['Boolean'];
};


export type MutationBookmarkArgs = {
  entryId: Scalars['String'];
};


export type MutationCommentArgs = {
  comment: Scalars['String'];
};


export type MutationCreateCustomTextArgs = {
  id: Scalars['String'];
  text: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteCustomTextArgs = {
  id: Scalars['String'];
};


export type MutationRecoverPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  passwordResetToken: Scalars['String'];
};


export type MutationSetSettingsArgs = {
  settings: SettingsInput;
};


export type MutationUnbookmarkArgs = {
  entryId: Scalars['String'];
};

export type NonFinite = {
  __typename?: 'NonFinite';
  infinitive?: Maybe<NonFiniteInfinitive>;
  participle?: Maybe<NonFiniteParticiple>;
};

export type NonFiniteInfinitive = {
  __typename?: 'NonFiniteInfinitive';
  active?: Maybe<NonFinitePresentPerfectFuture>;
  passive?: Maybe<NonFinitePresentPerfectFuture>;
};

export type NonFiniteParticiple = {
  __typename?: 'NonFiniteParticiple';
  active?: Maybe<NonFinitePresentFuture>;
  passive?: Maybe<NonFinitePerfectFuture>;
};

export type NonFinitePerfectFuture = {
  __typename?: 'NonFinitePerfectFuture';
  future?: Maybe<Array<Scalars['String']>>;
  perfect?: Maybe<Array<Scalars['String']>>;
};

export type NonFinitePresentFuture = {
  __typename?: 'NonFinitePresentFuture';
  future?: Maybe<Array<Scalars['String']>>;
  present?: Maybe<Array<Scalars['String']>>;
};

export type NonFinitePresentPerfectFuture = {
  __typename?: 'NonFinitePresentPerfectFuture';
  future?: Maybe<Array<Scalars['String']>>;
  perfect?: Maybe<Array<Scalars['String']>>;
  present?: Maybe<Array<Scalars['String']>>;
};

export type NounForms = {
  __typename?: 'NounForms';
  ablative?: Maybe<NounNumber>;
  accusative?: Maybe<NounNumber>;
  dative?: Maybe<NounNumber>;
  genitive?: Maybe<NounNumber>;
  locative?: Maybe<NounNumber>;
  nominative?: Maybe<NounNumber>;
  vocative?: Maybe<NounNumber>;
};

export type NounInflection = {
  __typename?: 'NounInflection';
  declension: Scalars['String'];
  gender: Scalars['String'];
  other: Scalars['String'];
};

export type NounNumber = {
  __typename?: 'NounNumber';
  plural?: Maybe<Array<Scalars['String']>>;
  singular?: Maybe<Array<Scalars['String']>>;
};

export type PrepositionInflection = {
  __typename?: 'PrepositionInflection';
  case: Scalars['String'];
  other: Scalars['String'];
};

export type PrincipalPart = {
  __typename?: 'PrincipalPart';
  name: Scalars['String'];
  text: Array<Scalars['String']>;
};

export type Pronunciation = {
  __typename?: 'Pronunciation';
  classical: PronunciationParts;
  ecclesiastical: PronunciationParts;
  vulgar: PronunciationParts;
};

export type PronunciationParts = {
  __typename?: 'PronunciationParts';
  phonemes: Scalars['String'];
  phonemic: Scalars['String'];
  phonetic: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bookmarks: Array<Entry>;
  entries: Array<Entry>;
  entry: Entry;
  facebook: User;
  findText: Text;
  getAuthor: Author;
  getAuthors: Array<Author>;
  getBook: Book;
  getBooks: Array<Book>;
  getCustomText: CustomText;
  getText: Text;
  getTextIds: Array<Text>;
  getTexts: Array<Text>;
  google: User;
  listCustomTexts: Array<CustomText>;
  login: User;
  logout: Scalars['Boolean'];
  searchAuthors: Array<Author>;
  searchBooks: Array<Book>;
  searchEnglish: Array<Entry>;
  searchLatin: Array<Entry>;
  searchLines: Array<Line>;
  searchLiterature: Array<Author>;
  searchTexts: Array<Text>;
  settings: Settings;
  user: User;
  users: Array<User>;
  validatePasswordResetToken: Scalars['Boolean'];
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


export type QueryGetAuthorArgs = {
  id: Scalars['String'];
};


export type QueryGetBookArgs = {
  id: Scalars['String'];
};


export type QueryGetCustomTextArgs = {
  id: Scalars['String'];
};


export type QueryGetTextArgs = {
  id: Scalars['String'];
};


export type QueryGoogleArgs = {
  code: Scalars['String'];
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
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


export type QueryValidatePasswordResetTokenArgs = {
  passwordResetToken: Scalars['String'];
};

export type Settings = {
  __typename?: 'Settings';
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
  __typename?: 'Subjunctive';
  active?: Maybe<SubjunctiveTense>;
  passive?: Maybe<SubjunctiveTense>;
};

export type SubjunctiveNumber = {
  __typename?: 'SubjunctiveNumber';
  plural?: Maybe<SubjunctivePerson>;
  singular?: Maybe<SubjunctivePerson>;
};

export type SubjunctivePerson = {
  __typename?: 'SubjunctivePerson';
  first?: Maybe<Array<Scalars['String']>>;
  second?: Maybe<Array<Scalars['String']>>;
  third?: Maybe<Array<Scalars['String']>>;
};

export type SubjunctiveTense = {
  __typename?: 'SubjunctiveTense';
  imperfect?: Maybe<SubjunctiveNumber>;
  perfect?: Maybe<SubjunctiveNumber>;
  pluperfect?: Maybe<SubjunctiveNumber>;
  present?: Maybe<SubjunctiveNumber>;
};

export type Supine = {
  __typename?: 'Supine';
  ablative?: Maybe<Array<Scalars['String']>>;
  accusative?: Maybe<Array<Scalars['String']>>;
};

export type Text = {
  __typename?: 'Text';
  author: Author;
  book?: Maybe<Book>;
  id: Scalars['ID'];
  lines: Array<Line>;
  linesSlice: Array<Line>;
  title: Scalars['String'];
};


export type TextLinesSliceArgs = {
  end?: Maybe<Scalars['Float']>;
  start?: Maybe<Scalars['Float']>;
};

export type Translation = {
  __typename?: 'Translation';
  entry: Entry;
  id: Scalars['ID'];
  translation: Scalars['String'];
};

export type Uninflected = {
  __typename?: 'Uninflected';
  other: Scalars['String'];
};

export type User = {
  __typename?: 'User';
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
  __typename?: 'VerbForms';
  imperative?: Maybe<Imperative>;
  indicative?: Maybe<Indicative>;
  nonFinite?: Maybe<NonFinite>;
  subjunctive?: Maybe<Subjunctive>;
  verbalNoun?: Maybe<VerbalNoun>;
};

export type VerbInflection = {
  __typename?: 'VerbInflection';
  conjugation: Scalars['String'];
  other: Scalars['String'];
};

export type VerbalNoun = {
  __typename?: 'VerbalNoun';
  gerund?: Maybe<Gerund>;
  supine?: Maybe<Supine>;
};

export type Word = {
  __typename?: 'Word';
  entries: Array<Entry>;
  word: Scalars['String'];
};

export type CommentMutationVariables = Exact<{
  comment: Scalars['String'];
}>;


export type CommentMutation = { __typename?: 'Mutation', comment: boolean };

export type BookmarkMutationVariables = Exact<{
  entryId: Scalars['String'];
}>;


export type BookmarkMutation = { __typename?: 'Mutation', bookmark: boolean };

export type BookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type BookmarksQuery = { __typename?: 'Query', bookmarks: Array<{ __typename?: 'Entry', id: string, partOfSpeech: string, identifiers?: Maybe<Array<string>>, bookmarked?: Maybe<boolean>, principalParts?: Maybe<Array<{ __typename?: 'PrincipalPart', name: string, text: Array<string> }>>, inflection?: Maybe<{ __typename?: 'AdjectiveInflection', declension: string, degree: string, other: string } | { __typename?: 'AdverbInflection', type: string, degree: string } | { __typename?: 'NounInflection', declension: string, gender: string, other: string } | { __typename?: 'PrepositionInflection', case: string, other: string } | { __typename?: 'Uninflected', other: string } | { __typename?: 'VerbInflection', conjugation: string, other: string }>, translations?: Maybe<Array<{ __typename?: 'Translation', id: string, translation: string }>>, forms?: Maybe<{ __typename?: 'AdjectiveForms', masculine?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, feminine?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, neuter?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }> } | { __typename?: 'AdverbForms', positive?: Maybe<Array<string>>, comparative?: Maybe<Array<string>>, superlative?: Maybe<Array<string>> } | { __typename?: 'NounForms', nominative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> } | { __typename?: 'VerbForms', indicative?: Maybe<{ __typename?: 'Indicative', active?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, subjunctive?: Maybe<{ __typename?: 'Subjunctive', active?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, imperative?: Maybe<{ __typename?: 'Imperative', active?: Maybe<{ __typename?: 'ImperativeActive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativeActiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'ImperativePassive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativePassiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeThird', third?: Maybe<Array<string>> }> }> }> }>, nonFinite?: Maybe<{ __typename?: 'NonFinite', infinitive?: Maybe<{ __typename?: 'NonFiniteInfinitive', active?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }>, participle?: Maybe<{ __typename?: 'NonFiniteParticiple', active?: Maybe<{ __typename?: 'NonFinitePresentFuture', present?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePerfectFuture', perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }> }>, verbalNoun?: Maybe<{ __typename?: 'VerbalNoun', gerund?: Maybe<{ __typename?: 'Gerund', genitive?: Maybe<Array<string>>, dative?: Maybe<Array<string>>, accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }>, supine?: Maybe<{ __typename?: 'Supine', accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }> }> }> }> };

export type EntriesQueryVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type EntriesQuery = { __typename?: 'Query', entries: Array<{ __typename?: 'Entry', id: string, partOfSpeech: string, identifiers?: Maybe<Array<string>>, bookmarked?: Maybe<boolean>, principalParts?: Maybe<Array<{ __typename?: 'PrincipalPart', name: string, text: Array<string> }>>, inflection?: Maybe<{ __typename?: 'AdjectiveInflection', declension: string, degree: string, other: string } | { __typename?: 'AdverbInflection', type: string, degree: string } | { __typename?: 'NounInflection', declension: string, gender: string, other: string } | { __typename?: 'PrepositionInflection', case: string, other: string } | { __typename?: 'Uninflected', other: string } | { __typename?: 'VerbInflection', conjugation: string, other: string }>, translations?: Maybe<Array<{ __typename?: 'Translation', id: string, translation: string }>>, forms?: Maybe<{ __typename?: 'AdjectiveForms', masculine?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, feminine?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, neuter?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }> } | { __typename?: 'AdverbForms', positive?: Maybe<Array<string>>, comparative?: Maybe<Array<string>>, superlative?: Maybe<Array<string>> } | { __typename?: 'NounForms', nominative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> } | { __typename?: 'VerbForms', indicative?: Maybe<{ __typename?: 'Indicative', active?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, subjunctive?: Maybe<{ __typename?: 'Subjunctive', active?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, imperative?: Maybe<{ __typename?: 'Imperative', active?: Maybe<{ __typename?: 'ImperativeActive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativeActiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'ImperativePassive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativePassiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeThird', third?: Maybe<Array<string>> }> }> }> }>, nonFinite?: Maybe<{ __typename?: 'NonFinite', infinitive?: Maybe<{ __typename?: 'NonFiniteInfinitive', active?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }>, participle?: Maybe<{ __typename?: 'NonFiniteParticiple', active?: Maybe<{ __typename?: 'NonFinitePresentFuture', present?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePerfectFuture', perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }> }>, verbalNoun?: Maybe<{ __typename?: 'VerbalNoun', gerund?: Maybe<{ __typename?: 'Gerund', genitive?: Maybe<Array<string>>, dative?: Maybe<Array<string>>, accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }>, supine?: Maybe<{ __typename?: 'Supine', accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }> }> }> }> };

export type UnbookmarkMutationVariables = Exact<{
  entryId: Scalars['String'];
}>;


export type UnbookmarkMutation = { __typename?: 'Mutation', unbookmark: boolean };

export type AllEntryFragment = { __typename?: 'Entry', id: string, partOfSpeech: string, identifiers?: Maybe<Array<string>>, bookmarked?: Maybe<boolean>, principalParts?: Maybe<Array<{ __typename?: 'PrincipalPart', name: string, text: Array<string> }>>, inflection?: Maybe<{ __typename?: 'AdjectiveInflection', declension: string, degree: string, other: string } | { __typename?: 'AdverbInflection', type: string, degree: string } | { __typename?: 'NounInflection', declension: string, gender: string, other: string } | { __typename?: 'PrepositionInflection', case: string, other: string } | { __typename?: 'Uninflected', other: string } | { __typename?: 'VerbInflection', conjugation: string, other: string }>, translations?: Maybe<Array<{ __typename?: 'Translation', id: string, translation: string }>>, forms?: Maybe<{ __typename?: 'AdjectiveForms', masculine?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, feminine?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, neuter?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }> } | { __typename?: 'AdverbForms', positive?: Maybe<Array<string>>, comparative?: Maybe<Array<string>>, superlative?: Maybe<Array<string>> } | { __typename?: 'NounForms', nominative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> } | { __typename?: 'VerbForms', indicative?: Maybe<{ __typename?: 'Indicative', active?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, subjunctive?: Maybe<{ __typename?: 'Subjunctive', active?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, imperative?: Maybe<{ __typename?: 'Imperative', active?: Maybe<{ __typename?: 'ImperativeActive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativeActiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'ImperativePassive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativePassiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeThird', third?: Maybe<Array<string>> }> }> }> }>, nonFinite?: Maybe<{ __typename?: 'NonFinite', infinitive?: Maybe<{ __typename?: 'NonFiniteInfinitive', active?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }>, participle?: Maybe<{ __typename?: 'NonFiniteParticiple', active?: Maybe<{ __typename?: 'NonFinitePresentFuture', present?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePerfectFuture', perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }> }>, verbalNoun?: Maybe<{ __typename?: 'VerbalNoun', gerund?: Maybe<{ __typename?: 'Gerund', genitive?: Maybe<Array<string>>, dative?: Maybe<Array<string>>, accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }>, supine?: Maybe<{ __typename?: 'Supine', accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }> }> }> };


export type AllEntryFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllPrincipalPartsFragment = { __typename?: 'PrincipalPart', name: string, text: Array<string> };


export type AllPrincipalPartsFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllSettingsFragment = { __typename?: 'Settings', theme?: Maybe<string>, fontSize?: Maybe<number>, formsExpandedDefault?: Maybe<boolean>, translationsExpandedDefault?: Maybe<boolean>, dictionaryMacronized?: Maybe<boolean>, literatureMacronized?: Maybe<boolean> };


export type AllSettingsFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllTranslationsFragment = { __typename?: 'Translation', id: string, translation: string };


export type AllTranslationsFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllAdjectiveFormsFragment = { __typename?: 'AdjectiveForms', masculine?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, feminine?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, neuter?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }> };


export type AllAdjectiveFormsFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllAdjectiveCaseFragment = { __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> };


export type AllAdjectiveCaseFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllAdjectiveNumberFragment = { __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> };


export type AllAdjectiveNumberFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllAdverbFormsFragment = { __typename?: 'AdverbForms', positive?: Maybe<Array<string>>, comparative?: Maybe<Array<string>>, superlative?: Maybe<Array<string>> };


export type AllAdverbFormsFragmentVariables = Exact<{ [key: string]: never; }>;

type AllForms_AdjectiveForms_Fragment = { __typename?: 'AdjectiveForms', masculine?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, feminine?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, neuter?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }> };

type AllForms_AdverbForms_Fragment = { __typename?: 'AdverbForms', positive?: Maybe<Array<string>>, comparative?: Maybe<Array<string>>, superlative?: Maybe<Array<string>> };

type AllForms_NounForms_Fragment = { __typename?: 'NounForms', nominative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> };

type AllForms_VerbForms_Fragment = { __typename?: 'VerbForms', indicative?: Maybe<{ __typename?: 'Indicative', active?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, subjunctive?: Maybe<{ __typename?: 'Subjunctive', active?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, imperative?: Maybe<{ __typename?: 'Imperative', active?: Maybe<{ __typename?: 'ImperativeActive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativeActiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'ImperativePassive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativePassiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeThird', third?: Maybe<Array<string>> }> }> }> }>, nonFinite?: Maybe<{ __typename?: 'NonFinite', infinitive?: Maybe<{ __typename?: 'NonFiniteInfinitive', active?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }>, participle?: Maybe<{ __typename?: 'NonFiniteParticiple', active?: Maybe<{ __typename?: 'NonFinitePresentFuture', present?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePerfectFuture', perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }> }>, verbalNoun?: Maybe<{ __typename?: 'VerbalNoun', gerund?: Maybe<{ __typename?: 'Gerund', genitive?: Maybe<Array<string>>, dative?: Maybe<Array<string>>, accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }>, supine?: Maybe<{ __typename?: 'Supine', accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }> }> };

export type AllFormsFragment = AllForms_AdjectiveForms_Fragment | AllForms_AdverbForms_Fragment | AllForms_NounForms_Fragment | AllForms_VerbForms_Fragment;


export type AllFormsFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllNounFormsFragment = { __typename?: 'NounForms', nominative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> };


export type AllNounFormsFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllNounNumbersFragment = { __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> };


export type AllNounNumbersFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllImperativeFragment = { __typename?: 'Imperative', active?: Maybe<{ __typename?: 'ImperativeActive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativeActiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'ImperativePassive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativePassiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeThird', third?: Maybe<Array<string>> }> }> }> };


export type AllImperativeFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllImperativeActiveFragment = { __typename?: 'ImperativeActive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativeActiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> };


export type AllImperativeActiveFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllImperativePassiveFragment = { __typename?: 'ImperativePassive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativePassiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeThird', third?: Maybe<Array<string>> }> }> };


export type AllImperativePassiveFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllImperativePresentFragment = { __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> };


export type AllImperativePresentFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllImperativeActiveFutureFragment = { __typename?: 'ImperativeActiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> };


export type AllImperativeActiveFutureFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllImperativePassiveFutureFragment = { __typename?: 'ImperativePassiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeThird', third?: Maybe<Array<string>> }> };


export type AllImperativePassiveFutureFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllImperativeSecondThirdFragment = { __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> };


export type AllImperativeSecondThirdFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllImperativeSecondFragment = { __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> };


export type AllImperativeSecondFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllImperativeThirdFragment = { __typename?: 'ImperativeThird', third?: Maybe<Array<string>> };


export type AllImperativeThirdFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllIndicativeFragment = { __typename?: 'Indicative', active?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> };


export type AllIndicativeFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllIndicativeTenseFragment = { __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> };


export type AllIndicativeTenseFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllIndicativeNumberFragment = { __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> };


export type AllIndicativeNumberFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllIndicativePersonFragment = { __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> };


export type AllIndicativePersonFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllNonFiniteFragment = { __typename?: 'NonFinite', infinitive?: Maybe<{ __typename?: 'NonFiniteInfinitive', active?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }>, participle?: Maybe<{ __typename?: 'NonFiniteParticiple', active?: Maybe<{ __typename?: 'NonFinitePresentFuture', present?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePerfectFuture', perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }> };


export type AllNonFiniteFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllNonFiniteInfinitiveFragment = { __typename?: 'NonFiniteInfinitive', active?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> };


export type AllNonFiniteInfinitiveFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllNonFiniteParticipleFragment = { __typename?: 'NonFiniteParticiple', active?: Maybe<{ __typename?: 'NonFinitePresentFuture', present?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePerfectFuture', perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> };


export type AllNonFiniteParticipleFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllNonFinitePresentFutureFragment = { __typename?: 'NonFinitePresentFuture', present?: Maybe<Array<string>>, future?: Maybe<Array<string>> };


export type AllNonFinitePresentFutureFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllNonFinitePerfectFutureFragment = { __typename?: 'NonFinitePerfectFuture', perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> };


export type AllNonFinitePerfectFutureFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllNonFinitePresentPerfectFutureFragment = { __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> };


export type AllNonFinitePresentPerfectFutureFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllSubjunctiveFragment = { __typename?: 'Subjunctive', active?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> };


export type AllSubjunctiveFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllSubjunctiveTenseFragment = { __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> };


export type AllSubjunctiveTenseFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllSubjunctiveNumberFragment = { __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> };


export type AllSubjunctiveNumberFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllSubjunctivePersonFragment = { __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> };


export type AllSubjunctivePersonFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllVerbFormsFragment = { __typename?: 'VerbForms', indicative?: Maybe<{ __typename?: 'Indicative', active?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, subjunctive?: Maybe<{ __typename?: 'Subjunctive', active?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, imperative?: Maybe<{ __typename?: 'Imperative', active?: Maybe<{ __typename?: 'ImperativeActive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativeActiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'ImperativePassive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativePassiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeThird', third?: Maybe<Array<string>> }> }> }> }>, nonFinite?: Maybe<{ __typename?: 'NonFinite', infinitive?: Maybe<{ __typename?: 'NonFiniteInfinitive', active?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }>, participle?: Maybe<{ __typename?: 'NonFiniteParticiple', active?: Maybe<{ __typename?: 'NonFinitePresentFuture', present?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePerfectFuture', perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }> }>, verbalNoun?: Maybe<{ __typename?: 'VerbalNoun', gerund?: Maybe<{ __typename?: 'Gerund', genitive?: Maybe<Array<string>>, dative?: Maybe<Array<string>>, accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }>, supine?: Maybe<{ __typename?: 'Supine', accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }> }> };


export type AllVerbFormsFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllVerbalNounFragment = { __typename?: 'VerbalNoun', gerund?: Maybe<{ __typename?: 'Gerund', genitive?: Maybe<Array<string>>, dative?: Maybe<Array<string>>, accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }>, supine?: Maybe<{ __typename?: 'Supine', accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }> };


export type AllVerbalNounFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllGerundFragment = { __typename?: 'Gerund', genitive?: Maybe<Array<string>>, dative?: Maybe<Array<string>>, accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> };


export type AllGerundFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllSupineFragment = { __typename?: 'Supine', accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> };


export type AllSupineFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllAdjectiveInflectionsFragment = { __typename?: 'AdjectiveInflection', declension: string, degree: string, other: string };


export type AllAdjectiveInflectionsFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllAdverbInflectionsFragment = { __typename?: 'AdverbInflection', type: string, degree: string };


export type AllAdverbInflectionsFragmentVariables = Exact<{ [key: string]: never; }>;

type AllInflections_AdjectiveInflection_Fragment = { __typename?: 'AdjectiveInflection', declension: string, degree: string, other: string };

type AllInflections_AdverbInflection_Fragment = { __typename?: 'AdverbInflection', type: string, degree: string };

type AllInflections_NounInflection_Fragment = { __typename?: 'NounInflection', declension: string, gender: string, other: string };

type AllInflections_PrepositionInflection_Fragment = { __typename?: 'PrepositionInflection', case: string, other: string };

type AllInflections_Uninflected_Fragment = { __typename?: 'Uninflected', other: string };

type AllInflections_VerbInflection_Fragment = { __typename?: 'VerbInflection', conjugation: string, other: string };

export type AllInflectionsFragment = AllInflections_AdjectiveInflection_Fragment | AllInflections_AdverbInflection_Fragment | AllInflections_NounInflection_Fragment | AllInflections_PrepositionInflection_Fragment | AllInflections_Uninflected_Fragment | AllInflections_VerbInflection_Fragment;


export type AllInflectionsFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllNounInflectionsFragment = { __typename?: 'NounInflection', declension: string, gender: string, other: string };


export type AllNounInflectionsFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllPrepositionInflectionsFragment = { __typename?: 'PrepositionInflection', case: string, other: string };


export type AllPrepositionInflectionsFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllUninflectedFragment = { __typename?: 'Uninflected', other: string };


export type AllUninflectedFragmentVariables = Exact<{ [key: string]: never; }>;

export type AllVerbInflectionsFragment = { __typename?: 'VerbInflection', conjugation: string, other: string };


export type AllVerbInflectionsFragmentVariables = Exact<{ [key: string]: never; }>;

export type CreateCustomTextMutationVariables = Exact<{
  id: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
}>;


export type CreateCustomTextMutation = { __typename?: 'Mutation', createCustomText: { __typename?: 'CustomText', id: string, title: string, text: string } };

export type DeleteCustomTextMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCustomTextMutation = { __typename?: 'Mutation', deleteCustomText: boolean };

export type GetCustomTextQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCustomTextQuery = { __typename?: 'Query', getCustomText: { __typename?: 'CustomText', id: string, title: string, text: string } };

export type ListCustomTextsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListCustomTextsQuery = { __typename?: 'Query', listCustomTexts: Array<{ __typename?: 'CustomText', id: string, title: string, text: string }> };

export type FindTextQueryVariables = Exact<{
  author: Scalars['String'];
  book?: Maybe<Scalars['String']>;
  title: Scalars['String'];
}>;


export type FindTextQuery = { __typename?: 'Query', findText: { __typename?: 'Text', id: string, title: string, lines: Array<{ __typename?: 'Line', id: string, line: string, lineNumber: number, lineLabel: string }>, book?: Maybe<{ __typename?: 'Book', id: string, title: string }>, author: { __typename?: 'Author', id: string, name: string } } };

export type GetAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthorsQuery = { __typename?: 'Query', getAuthors: Array<{ __typename?: 'Author', id: string, name: string, books?: Maybe<Array<{ __typename?: 'Book', id: string, title: string, texts: Array<{ __typename?: 'Text', id: string, title: string }> }>>, texts: Array<{ __typename?: 'Text', id: string, title: string }> }> };

export type GetTextQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTextQuery = { __typename?: 'Query', getText: { __typename?: 'Text', id: string, title: string, lines: Array<{ __typename?: 'Line', id: string, line: string, lineNumber: number, lineLabel: string }>, book?: Maybe<{ __typename?: 'Book', id: string, title: string }>, author: { __typename?: 'Author', id: string, name: string } } };

export type GetTextIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTextIdsQuery = { __typename?: 'Query', getTextIds: Array<{ __typename?: 'Text', id: string }> };

export type GetTextsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTextsQuery = { __typename?: 'Query', getTexts: Array<{ __typename?: 'Text', id: string, title: string, author: { __typename?: 'Author', name: string }, book?: Maybe<{ __typename?: 'Book', id: string, title: string }> }> };

export type SearchEnglishQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchEnglishQuery = { __typename?: 'Query', searchEnglish: Array<{ __typename?: 'Entry', id: string, partOfSpeech: string, identifiers?: Maybe<Array<string>>, bookmarked?: Maybe<boolean>, principalParts?: Maybe<Array<{ __typename?: 'PrincipalPart', name: string, text: Array<string> }>>, inflection?: Maybe<{ __typename?: 'AdjectiveInflection', declension: string, degree: string, other: string } | { __typename?: 'AdverbInflection', type: string, degree: string } | { __typename?: 'NounInflection', declension: string, gender: string, other: string } | { __typename?: 'PrepositionInflection', case: string, other: string } | { __typename?: 'Uninflected', other: string } | { __typename?: 'VerbInflection', conjugation: string, other: string }>, translations?: Maybe<Array<{ __typename?: 'Translation', id: string, translation: string }>>, forms?: Maybe<{ __typename?: 'AdjectiveForms', masculine?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, feminine?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, neuter?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }> } | { __typename?: 'AdverbForms', positive?: Maybe<Array<string>>, comparative?: Maybe<Array<string>>, superlative?: Maybe<Array<string>> } | { __typename?: 'NounForms', nominative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> } | { __typename?: 'VerbForms', indicative?: Maybe<{ __typename?: 'Indicative', active?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, subjunctive?: Maybe<{ __typename?: 'Subjunctive', active?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, imperative?: Maybe<{ __typename?: 'Imperative', active?: Maybe<{ __typename?: 'ImperativeActive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativeActiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'ImperativePassive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativePassiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeThird', third?: Maybe<Array<string>> }> }> }> }>, nonFinite?: Maybe<{ __typename?: 'NonFinite', infinitive?: Maybe<{ __typename?: 'NonFiniteInfinitive', active?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }>, participle?: Maybe<{ __typename?: 'NonFiniteParticiple', active?: Maybe<{ __typename?: 'NonFinitePresentFuture', present?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePerfectFuture', perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }> }>, verbalNoun?: Maybe<{ __typename?: 'VerbalNoun', gerund?: Maybe<{ __typename?: 'Gerund', genitive?: Maybe<Array<string>>, dative?: Maybe<Array<string>>, accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }>, supine?: Maybe<{ __typename?: 'Supine', accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }> }> }> }> };

export type SearchLatinQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchLatinQuery = { __typename?: 'Query', searchLatin: Array<{ __typename?: 'Entry', id: string, partOfSpeech: string, identifiers?: Maybe<Array<string>>, bookmarked?: Maybe<boolean>, principalParts?: Maybe<Array<{ __typename?: 'PrincipalPart', name: string, text: Array<string> }>>, inflection?: Maybe<{ __typename?: 'AdjectiveInflection', declension: string, degree: string, other: string } | { __typename?: 'AdverbInflection', type: string, degree: string } | { __typename?: 'NounInflection', declension: string, gender: string, other: string } | { __typename?: 'PrepositionInflection', case: string, other: string } | { __typename?: 'Uninflected', other: string } | { __typename?: 'VerbInflection', conjugation: string, other: string }>, translations?: Maybe<Array<{ __typename?: 'Translation', id: string, translation: string }>>, forms?: Maybe<{ __typename?: 'AdjectiveForms', masculine?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, feminine?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }>, neuter?: Maybe<{ __typename?: 'AdjectiveCase', nominative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'AdjectiveNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> }> } | { __typename?: 'AdverbForms', positive?: Maybe<Array<string>>, comparative?: Maybe<Array<string>>, superlative?: Maybe<Array<string>> } | { __typename?: 'NounForms', nominative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, genitive?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, dative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, accusative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, ablative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, vocative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }>, locative?: Maybe<{ __typename?: 'NounNumber', singular?: Maybe<Array<string>>, plural?: Maybe<Array<string>> }> } | { __typename?: 'VerbForms', indicative?: Maybe<{ __typename?: 'Indicative', active?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'IndicativeTense', present?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, futurePerfect?: Maybe<{ __typename?: 'IndicativeNumber', singular?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'IndicativePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, subjunctive?: Maybe<{ __typename?: 'Subjunctive', active?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'SubjunctiveTense', present?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, imperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, perfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }>, pluperfect?: Maybe<{ __typename?: 'SubjunctiveNumber', singular?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'SubjunctivePerson', first?: Maybe<Array<string>>, second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }> }>, imperative?: Maybe<{ __typename?: 'Imperative', active?: Maybe<{ __typename?: 'ImperativeActive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativeActiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }> }> }>, passive?: Maybe<{ __typename?: 'ImperativePassive', present?: Maybe<{ __typename?: 'ImperativePresent', singular?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeSecond', second?: Maybe<Array<string>> }> }>, future?: Maybe<{ __typename?: 'ImperativePassiveFuture', singular?: Maybe<{ __typename?: 'ImperativeSecondThird', second?: Maybe<Array<string>>, third?: Maybe<Array<string>> }>, plural?: Maybe<{ __typename?: 'ImperativeThird', third?: Maybe<Array<string>> }> }> }> }>, nonFinite?: Maybe<{ __typename?: 'NonFinite', infinitive?: Maybe<{ __typename?: 'NonFiniteInfinitive', active?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePresentPerfectFuture', present?: Maybe<Array<string>>, perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }>, participle?: Maybe<{ __typename?: 'NonFiniteParticiple', active?: Maybe<{ __typename?: 'NonFinitePresentFuture', present?: Maybe<Array<string>>, future?: Maybe<Array<string>> }>, passive?: Maybe<{ __typename?: 'NonFinitePerfectFuture', perfect?: Maybe<Array<string>>, future?: Maybe<Array<string>> }> }> }>, verbalNoun?: Maybe<{ __typename?: 'VerbalNoun', gerund?: Maybe<{ __typename?: 'Gerund', genitive?: Maybe<Array<string>>, dative?: Maybe<Array<string>>, accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }>, supine?: Maybe<{ __typename?: 'Supine', accusative?: Maybe<Array<string>>, ablative?: Maybe<Array<string>> }> }> }> }> };

export type FacebookQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type FacebookQuery = { __typename?: 'Query', facebook: { __typename?: 'User', id: string, email: string, facebookId?: Maybe<string> } };

export type GoogleQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type GoogleQuery = { __typename?: 'Query', google: { __typename?: 'User', id: string, email: string, googleId?: Maybe<string> } };

export type LoginQueryVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'User', id: string, email: string } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: boolean };

export type RecoverPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type RecoverPasswordMutation = { __typename?: 'Mutation', recoverPassword: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, email: string } };

export type ResetPasswordMutationVariables = Exact<{
  passwordResetToken: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type UnregisterMutationVariables = Exact<{ [key: string]: never; }>;


export type UnregisterMutation = { __typename?: 'Mutation', unregister: boolean };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, googleId?: Maybe<string>, facebookId?: Maybe<string>, settings?: Maybe<{ __typename?: 'Settings', theme?: Maybe<string>, fontSize?: Maybe<number>, formsExpandedDefault?: Maybe<boolean>, translationsExpandedDefault?: Maybe<boolean>, dictionaryMacronized?: Maybe<boolean>, literatureMacronized?: Maybe<boolean> }> } };

export type ValidatePasswordResetTokenQueryVariables = Exact<{
  passwordResetToken: Scalars['String'];
}>;


export type ValidatePasswordResetTokenQuery = { __typename?: 'Query', validatePasswordResetToken: boolean };

export type SetSettingsMutationVariables = Exact<{
  settings: SettingsInput;
}>;


export type SetSettingsMutation = { __typename?: 'Mutation', setSettings: boolean };

export const AllPrincipalPartsFragmentDoc = `
    fragment allPrincipalParts on PrincipalPart {
  name
  text
}
    `;
export const AllNounInflectionsFragmentDoc = `
    fragment allNounInflections on NounInflection {
  declension
  gender
  other
}
    `;
export const AllVerbInflectionsFragmentDoc = `
    fragment allVerbInflections on VerbInflection {
  conjugation
  other
}
    `;
export const AllAdjectiveInflectionsFragmentDoc = `
    fragment allAdjectiveInflections on AdjectiveInflection {
  declension
  degree
  other
}
    `;
export const AllAdverbInflectionsFragmentDoc = `
    fragment allAdverbInflections on AdverbInflection {
  type
  degree
}
    `;
export const AllPrepositionInflectionsFragmentDoc = `
    fragment allPrepositionInflections on PrepositionInflection {
  case
  other
}
    `;
export const AllUninflectedFragmentDoc = `
    fragment allUninflected on Uninflected {
  other
}
    `;
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
    ${AllNounInflectionsFragmentDoc}
${AllVerbInflectionsFragmentDoc}
${AllAdjectiveInflectionsFragmentDoc}
${AllAdverbInflectionsFragmentDoc}
${AllPrepositionInflectionsFragmentDoc}
${AllUninflectedFragmentDoc}`;
export const AllTranslationsFragmentDoc = `
    fragment allTranslations on Translation {
  id
  translation
}
    `;
export const AllNounNumbersFragmentDoc = `
    fragment allNounNumbers on NounNumber {
  singular
  plural
}
    `;
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
    ${AllNounNumbersFragmentDoc}`;
export const AllIndicativePersonFragmentDoc = `
    fragment allIndicativePerson on IndicativePerson {
  first
  second
  third
}
    `;
export const AllIndicativeNumberFragmentDoc = `
    fragment allIndicativeNumber on IndicativeNumber {
  singular {
    ...allIndicativePerson
  }
  plural {
    ...allIndicativePerson
  }
}
    ${AllIndicativePersonFragmentDoc}`;
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
    ${AllIndicativeNumberFragmentDoc}`;
export const AllIndicativeFragmentDoc = `
    fragment allIndicative on Indicative {
  active {
    ...allIndicativeTense
  }
  passive {
    ...allIndicativeTense
  }
}
    ${AllIndicativeTenseFragmentDoc}`;
export const AllSubjunctivePersonFragmentDoc = `
    fragment allSubjunctivePerson on SubjunctivePerson {
  first
  second
  third
}
    `;
export const AllSubjunctiveNumberFragmentDoc = `
    fragment allSubjunctiveNumber on SubjunctiveNumber {
  singular {
    ...allSubjunctivePerson
  }
  plural {
    ...allSubjunctivePerson
  }
}
    ${AllSubjunctivePersonFragmentDoc}`;
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
    ${AllSubjunctiveNumberFragmentDoc}`;
export const AllSubjunctiveFragmentDoc = `
    fragment allSubjunctive on Subjunctive {
  active {
    ...allSubjunctiveTense
  }
  passive {
    ...allSubjunctiveTense
  }
}
    ${AllSubjunctiveTenseFragmentDoc}`;
export const AllImperativeSecondFragmentDoc = `
    fragment allImperativeSecond on ImperativeSecond {
  second
}
    `;
export const AllImperativePresentFragmentDoc = `
    fragment allImperativePresent on ImperativePresent {
  singular {
    ...allImperativeSecond
  }
  plural {
    ...allImperativeSecond
  }
}
    ${AllImperativeSecondFragmentDoc}`;
export const AllImperativeSecondThirdFragmentDoc = `
    fragment allImperativeSecondThird on ImperativeSecondThird {
  second
  third
}
    `;
export const AllImperativeActiveFutureFragmentDoc = `
    fragment allImperativeActiveFuture on ImperativeActiveFuture {
  singular {
    ...allImperativeSecondThird
  }
  plural {
    ...allImperativeSecondThird
  }
}
    ${AllImperativeSecondThirdFragmentDoc}`;
export const AllImperativeActiveFragmentDoc = `
    fragment allImperativeActive on ImperativeActive {
  present {
    ...allImperativePresent
  }
  future {
    ...allImperativeActiveFuture
  }
}
    ${AllImperativePresentFragmentDoc}
${AllImperativeActiveFutureFragmentDoc}`;
export const AllImperativeThirdFragmentDoc = `
    fragment allImperativeThird on ImperativeThird {
  third
}
    `;
export const AllImperativePassiveFutureFragmentDoc = `
    fragment allImperativePassiveFuture on ImperativePassiveFuture {
  singular {
    ...allImperativeSecondThird
  }
  plural {
    ...allImperativeThird
  }
}
    ${AllImperativeSecondThirdFragmentDoc}
${AllImperativeThirdFragmentDoc}`;
export const AllImperativePassiveFragmentDoc = `
    fragment allImperativePassive on ImperativePassive {
  present {
    ...allImperativePresent
  }
  future {
    ...allImperativePassiveFuture
  }
}
    ${AllImperativePresentFragmentDoc}
${AllImperativePassiveFutureFragmentDoc}`;
export const AllImperativeFragmentDoc = `
    fragment allImperative on Imperative {
  active {
    ...allImperativeActive
  }
  passive {
    ...allImperativePassive
  }
}
    ${AllImperativeActiveFragmentDoc}
${AllImperativePassiveFragmentDoc}`;
export const AllNonFinitePresentPerfectFutureFragmentDoc = `
    fragment allNonFinitePresentPerfectFuture on NonFinitePresentPerfectFuture {
  present
  perfect
  future
}
    `;
export const AllNonFiniteInfinitiveFragmentDoc = `
    fragment allNonFiniteInfinitive on NonFiniteInfinitive {
  active {
    ...allNonFinitePresentPerfectFuture
  }
  passive {
    ...allNonFinitePresentPerfectFuture
  }
}
    ${AllNonFinitePresentPerfectFutureFragmentDoc}`;
export const AllNonFinitePresentFutureFragmentDoc = `
    fragment allNonFinitePresentFuture on NonFinitePresentFuture {
  present
  future
}
    `;
export const AllNonFinitePerfectFutureFragmentDoc = `
    fragment allNonFinitePerfectFuture on NonFinitePerfectFuture {
  perfect
  future
}
    `;
export const AllNonFiniteParticipleFragmentDoc = `
    fragment allNonFiniteParticiple on NonFiniteParticiple {
  active {
    ...allNonFinitePresentFuture
  }
  passive {
    ...allNonFinitePerfectFuture
  }
}
    ${AllNonFinitePresentFutureFragmentDoc}
${AllNonFinitePerfectFutureFragmentDoc}`;
export const AllNonFiniteFragmentDoc = `
    fragment allNonFinite on NonFinite {
  infinitive {
    ...allNonFiniteInfinitive
  }
  participle {
    ...allNonFiniteParticiple
  }
}
    ${AllNonFiniteInfinitiveFragmentDoc}
${AllNonFiniteParticipleFragmentDoc}`;
export const AllGerundFragmentDoc = `
    fragment allGerund on Gerund {
  genitive
  dative
  accusative
  ablative
}
    `;
export const AllSupineFragmentDoc = `
    fragment allSupine on Supine {
  accusative
  ablative
}
    `;
export const AllVerbalNounFragmentDoc = `
    fragment allVerbalNoun on VerbalNoun {
  gerund {
    ...allGerund
  }
  supine {
    ...allSupine
  }
}
    ${AllGerundFragmentDoc}
${AllSupineFragmentDoc}`;
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
    ${AllIndicativeFragmentDoc}
${AllSubjunctiveFragmentDoc}
${AllImperativeFragmentDoc}
${AllNonFiniteFragmentDoc}
${AllVerbalNounFragmentDoc}`;
export const AllAdjectiveNumberFragmentDoc = `
    fragment allAdjectiveNumber on AdjectiveNumber {
  singular
  plural
}
    `;
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
    ${AllAdjectiveNumberFragmentDoc}`;
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
    ${AllAdjectiveCaseFragmentDoc}`;
export const AllAdverbFormsFragmentDoc = `
    fragment allAdverbForms on AdverbForms {
  positive
  comparative
  superlative
}
    `;
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
    ${AllNounFormsFragmentDoc}
${AllVerbFormsFragmentDoc}
${AllAdjectiveFormsFragmentDoc}
${AllAdverbFormsFragmentDoc}`;
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
    ${AllPrincipalPartsFragmentDoc}
${AllInflectionsFragmentDoc}
${AllTranslationsFragmentDoc}
${AllFormsFragmentDoc}`;
export const AllSettingsFragmentDoc = `
    fragment allSettings on Settings {
  theme
  fontSize
  formsExpandedDefault
  translationsExpandedDefault
  dictionaryMacronized
  literatureMacronized
}
    `;
export const CommentDocument = `
    mutation comment($comment: String!) {
  comment(comment: $comment)
}
    `;
export const useCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CommentMutation, TError, CommentMutationVariables, TContext>) =>
    useMutation<CommentMutation, TError, CommentMutationVariables, TContext>(
      (variables?: CommentMutationVariables) => fetcher<CommentMutation, CommentMutationVariables>(CommentDocument, variables)(),
      options
    );
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
${AllAdverbFormsFragmentDoc}`;
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
${AllAdverbFormsFragmentDoc}`;
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
export const GetCustomTextDocument = `
    query GetCustomText($id: String!) {
  getCustomText(id: $id) {
    id
    title
    text
  }
}
    `;
export const useGetCustomTextQuery = <
      TData = GetCustomTextQuery,
      TError = unknown
    >(
      variables: GetCustomTextQueryVariables,
      options?: UseQueryOptions<GetCustomTextQuery, TError, TData>
    ) =>
    useQuery<GetCustomTextQuery, TError, TData>(
      ['GetCustomText', variables],
      fetcher<GetCustomTextQuery, GetCustomTextQueryVariables>(GetCustomTextDocument, variables),
      options
    );
export const ListCustomTextsDocument = `
    query ListCustomTexts {
  listCustomTexts {
    id
    title
    text
  }
}
    `;
export const useListCustomTextsQuery = <
      TData = ListCustomTextsQuery,
      TError = unknown
    >(
      variables?: ListCustomTextsQueryVariables,
      options?: UseQueryOptions<ListCustomTextsQuery, TError, TData>
    ) =>
    useQuery<ListCustomTextsQuery, TError, TData>(
      ['ListCustomTexts', variables],
      fetcher<ListCustomTextsQuery, ListCustomTextsQueryVariables>(ListCustomTextsDocument, variables),
      options
    );
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
    `;
export const useGetAuthorsQuery = <
      TData = GetAuthorsQuery,
      TError = unknown
    >(
      variables?: GetAuthorsQueryVariables,
      options?: UseQueryOptions<GetAuthorsQuery, TError, TData>
    ) =>
    useQuery<GetAuthorsQuery, TError, TData>(
      ['GetAuthors', variables],
      fetcher<GetAuthorsQuery, GetAuthorsQueryVariables>(GetAuthorsDocument, variables),
      options
    );
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
    `;
export const useGetTextQuery = <
      TData = GetTextQuery,
      TError = unknown
    >(
      variables: GetTextQueryVariables,
      options?: UseQueryOptions<GetTextQuery, TError, TData>
    ) =>
    useQuery<GetTextQuery, TError, TData>(
      ['GetText', variables],
      fetcher<GetTextQuery, GetTextQueryVariables>(GetTextDocument, variables),
      options
    );
export const GetTextIdsDocument = `
    query GetTextIds {
  getTextIds {
    id
  }
}
    `;
export const useGetTextIdsQuery = <
      TData = GetTextIdsQuery,
      TError = unknown
    >(
      variables?: GetTextIdsQueryVariables,
      options?: UseQueryOptions<GetTextIdsQuery, TError, TData>
    ) =>
    useQuery<GetTextIdsQuery, TError, TData>(
      ['GetTextIds', variables],
      fetcher<GetTextIdsQuery, GetTextIdsQueryVariables>(GetTextIdsDocument, variables),
      options
    );
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
    `;
export const useGetTextsQuery = <
      TData = GetTextsQuery,
      TError = unknown
    >(
      variables?: GetTextsQueryVariables,
      options?: UseQueryOptions<GetTextsQuery, TError, TData>
    ) =>
    useQuery<GetTextsQuery, TError, TData>(
      ['GetTexts', variables],
      fetcher<GetTextsQuery, GetTextsQueryVariables>(GetTextsDocument, variables),
      options
    );
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
${AllAdverbFormsFragmentDoc}`;
export const useSearchEnglishQuery = <
      TData = SearchEnglishQuery,
      TError = unknown
    >(
      variables: SearchEnglishQueryVariables,
      options?: UseQueryOptions<SearchEnglishQuery, TError, TData>
    ) =>
    useQuery<SearchEnglishQuery, TError, TData>(
      ['SearchEnglish', variables],
      fetcher<SearchEnglishQuery, SearchEnglishQueryVariables>(SearchEnglishDocument, variables),
      options
    );
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
${AllAdverbFormsFragmentDoc}`;
export const useSearchLatinQuery = <
      TData = SearchLatinQuery,
      TError = unknown
    >(
      variables: SearchLatinQueryVariables,
      options?: UseQueryOptions<SearchLatinQuery, TError, TData>
    ) =>
    useQuery<SearchLatinQuery, TError, TData>(
      ['SearchLatin', variables],
      fetcher<SearchLatinQuery, SearchLatinQueryVariables>(SearchLatinDocument, variables),
      options
    );
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
export const LoginDocument = `
    query Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
  }
}
    `;
export const useLoginQuery = <
      TData = LoginQuery,
      TError = unknown
    >(
      variables: LoginQueryVariables,
      options?: UseQueryOptions<LoginQuery, TError, TData>
    ) =>
    useQuery<LoginQuery, TError, TData>(
      ['Login', variables],
      fetcher<LoginQuery, LoginQueryVariables>(LoginDocument, variables),
      options
    );
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
export const RecoverPasswordDocument = `
    mutation RecoverPassword($email: String!) {
  recoverPassword(email: $email)
}
    `;
export const useRecoverPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RecoverPasswordMutation, TError, RecoverPasswordMutationVariables, TContext>) =>
    useMutation<RecoverPasswordMutation, TError, RecoverPasswordMutationVariables, TContext>(
      (variables?: RecoverPasswordMutationVariables) => fetcher<RecoverPasswordMutation, RecoverPasswordMutationVariables>(RecoverPasswordDocument, variables)(),
      options
    );
export const RegisterDocument = `
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    id
    email
  }
}
    `;
export const useRegisterMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>) =>
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(RegisterDocument, variables)(),
      options
    );
export const ResetPasswordDocument = `
    mutation ResetPassword($passwordResetToken: String!, $password: String!) {
  resetPassword(passwordResetToken: $passwordResetToken, password: $password)
}
    `;
export const useResetPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>) =>
    useMutation<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>(
      (variables?: ResetPasswordMutationVariables) => fetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, variables)(),
      options
    );
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
      ...allSettings
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
export const ValidatePasswordResetTokenDocument = `
    query ValidatePasswordResetToken($passwordResetToken: String!) {
  validatePasswordResetToken(passwordResetToken: $passwordResetToken)
}
    `;
export const useValidatePasswordResetTokenQuery = <
      TData = ValidatePasswordResetTokenQuery,
      TError = unknown
    >(
      variables: ValidatePasswordResetTokenQueryVariables,
      options?: UseQueryOptions<ValidatePasswordResetTokenQuery, TError, TData>
    ) =>
    useQuery<ValidatePasswordResetTokenQuery, TError, TData>(
      ['ValidatePasswordResetToken', variables],
      fetcher<ValidatePasswordResetTokenQuery, ValidatePasswordResetTokenQueryVariables>(ValidatePasswordResetTokenDocument, variables),
      options
    );
export const SetSettingsDocument = `
    mutation SetSettings($settings: SettingsInput!) {
  setSettings(settings: $settings)
}
    `;
export const useSetSettingsMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SetSettingsMutation, TError, SetSettingsMutationVariables, TContext>) =>
    useMutation<SetSettingsMutation, TError, SetSettingsMutationVariables, TContext>(
      (variables?: SetSettingsMutationVariables) => fetcher<SetSettingsMutation, SetSettingsMutationVariables>(SetSettingsDocument, variables)(),
      options
    );