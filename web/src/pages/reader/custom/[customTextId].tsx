import { GetServerSideProps } from 'next'

import {
  CustomText,
  getCustomTextLocal,
} from 'src/components/library/custom/customTextsLocal'
import { Author, Book, Text, useCustomTextQuery } from 'src/graphql/generated'

import Reader from '../[textId]'

type Props = { id: string }

export default function CustomReader({ id }: Props) {
  const { data, isSuccess } = useCustomTextQuery({ id })
  const localText = getCustomTextLocal(id)
  const text = (isSuccess ? data?.customText : localText) as CustomText
  return !text ? <></> : <Reader text={customTextToText(text)} />
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { id: params?.customTextId } }
}

function customTextToText({ id, title, text, local }: CustomText): Text {
  const customText = {
    id,
    title,
    author: { id: 'custom', name: 'custom' } as Author,
    book: (local
      ? { id: 'local', title: 'local' }
      : { id: 'user', title: 'user' }) as Book,
    lines: [],
  }
  customText.author.texts = [customText as never]
  customText.book.author = customText.author
  customText.book.texts = [customText as never]
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
