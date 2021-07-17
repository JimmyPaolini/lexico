import { GetServerSideProps } from "next"
import { memo, useState } from "react"
import Author from "../../../../../entity/literature/Author"
import Book from "../../../../../entity/literature/Book"
import Text from "../../../../../entity/literature/Text"
import { CustomText, getLiteratureLocal } from "../../../utils/localLiterature"
import Reader from "../[id]"

interface CustomReaderProps {
  id: string
}
export default memo(function CustomReader({
  id,
}: CustomReaderProps): JSX.Element {
  const [localLiterature] = useState(getLiteratureLocal(id))
  console.log(localLiterature)
  return <Reader text={localLiteratureToText(localLiterature)} />
})

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { id: params?.id } }
}

function localLiteratureToText({ id, title, text }: CustomText): Text {
  const customText = {
    id,
    title,
    author: { id: "custom", name: "custom" } as Author,
    book: { id: "local", title: "local" } as Book,
    lines: [],
    linesSlice: () => [],
  }
  customText.author.texts = [customText as never]
  customText.book.author = customText.author
  customText.book.texts = [customText as never]
  customText.lines = text.split("\n").map((line, i) => {
    return {
      id: `${i}`,
      line: line.replace(/^#\S+ ?/, ""),
      lineNumber: i + 1,
      lineLabel: line.match(/^#\S+/)?.[0].slice(1) || `${i + 1}`,
      text: customText,
    }
  }) as never[]
  return customText
}
