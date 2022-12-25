import Head from 'next/head'

import { CustomText } from 'src/graphql/generated'

import { CustomTextForm } from '../../components/reader/CustomTextForm/CustomTextForm'

type Props = { text?: CustomText }

export default function CustomReaderNew({ text }: Props) {
  return (
    <>
      <Head>
        <title>Lexico - Library: Custom</title>
        <meta
          name="description"
          content={
            'Read and translate your own literature with Lexico for better flow'
          }
        />
        <meta
          name="keywords"
          content={
            'Latin, Library, Literature, Read, English, Translation, Custom'
          }
        />
      </Head>
      <style>{`
        body#body {
          background-color: black;
        }
      `}</style>
      <CustomTextForm text={text} />
    </>
  )
}
