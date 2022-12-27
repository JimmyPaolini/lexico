import { GetServerSideProps } from 'next'

import { getCustomTextLocal } from 'src/components/library/CustomTextsCard/CustomTexts/localCustomTexts'
import {
  Author,
  Book,
  CustomText,
  Text,
  useCustomTextQuery,
} from 'src/graphql/generated'

import Reader from '../text/[id]'

type Props = { id: string }

export default function UserTextReader({ id }: Props) {
  const { data, isSuccess } = useCustomTextQuery({ id })
  const remoteText = data?.customText

  const localText = getCustomTextLocal(id)

  const userText = (isSuccess ? remoteText : localText) as CustomText

  return !userText ? <></> : <Reader text={userTextToText(userText)} />
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { id: params?.id } }
}

function userTextToText({ id, title, text, user }: CustomText): Text {
  const customText = {
    id,
    title,
    author: { id: 'custom', name: 'custom' } as Author,
    book: (user
      ? { id: 'local', title: 'local' }
      : { id: 'user', title: 'user' }) as Book,
    lines: [],
  }
  customText.author.texts = [customText as Text]
  customText.book.author = customText.author
  customText.book.texts = [customText as Text]
  customText.lines = text.split('\n').map((line, i: number) => {
    return {
      id: `${i}`,
      line: line.replace(/^#\S+ ?/, ''),
      lineNumber: i + 1,
      lineLabel: line.match(/^#\S+/)?.[0].slice(1) || `${i + 1}`,
      text: customText,
    }
  }) as never[]
  return customText
}
