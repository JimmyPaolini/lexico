import { useRouter } from 'next/router'

import { GetServerSideProps } from 'next'

import { getUserTextLocal } from 'src/components/library/UserTextsCard/UserTexts/localUserTexts'
import {
  Author,
  Book,
  CustomText,
  Line,
  Text,
  UserTextDocument,
  UserTextQuery,
  UserTextQueryVariables,
} from 'src/graphql/generated'

import { fetcher } from '../../graphql/fetcher'
import Reader from '../text/[id]'

type Props = { userText?: CustomText }

export default function UserTextReader({ userText: userTextRemote }: Props) {
  const router = useRouter()
  const userTextId = router.asPath.replace(/^\/userText\//, '')
  const userTextLocal = getUserTextLocal(userTextId)

  const userText = userTextRemote ?? userTextLocal

  return !userText ? <></> : <Reader text={userTextToText(userText)} />
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const userTextId = params?.id as string
  if (!userTextId) return { notFound: true }
  try {
    const data = await fetcher<UserTextQuery, UserTextQueryVariables>(
      UserTextDocument,
      { id: userTextId },
      { cookie: req.headers.cookie as string }
    )()
    const userText = data?.userText
    return { props: { userText } }
  } catch {
    return { props: {} }
  }
}

function userTextToText({ id, title, text, user }: CustomText): Text {
  const userText = {
    id,
    title,
    author: { id: 'user', name: 'user' } as Author,
    book: (user
      ? { id: 'local', title: 'local' }
      : { id: 'remote', title: 'remote' }) as Book,
    lines: [] as Line[],
  }
  userText.author.texts = [userText as Text]
  userText.book.author = userText.author
  userText.book.texts = [userText as Text]
  userText.lines = text.split('\n').map((line, i: number) => {
    return {
      id: `${i}`,
      line: line.replace(/^#\S+ ?/, ''),
      lineNumber: i + 1,
      lineLabel: line.match(/^#\S+/)?.[0].slice(1) || `${i + 1}`,
      text: userText,
    }
  })
  console.log('🐋 ~ userText', userText)
  return userText
}
