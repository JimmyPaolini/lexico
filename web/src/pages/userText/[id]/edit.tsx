import Head from 'next/head'

import { GetServerSideProps } from 'next'

import { getCustomTextLocal } from 'src/components/library/CustomTextsCard/CustomTexts'
import { CustomTextForm } from 'src/components/reader/CustomTextForm/CustomTextForm'
import { CustomText, useCustomTextQuery } from 'src/graphql/generated'

type Props = { id: string }

export default function UserTextEditor({ id }: Props) {
  const { data, isSuccess } = useCustomTextQuery({ id })
  const remoteText = data?.customText

  const localText = getCustomTextLocal(id)

  const userText = (isSuccess ? remoteText : localText) as CustomText

  return (
    <>
      <Head>
        <title>Lexico - Library: Custom</title>
        <meta
          name="description"
          content={
            'Read and translate your Latin text faster and more efficiently in Lexico'
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
      <CustomTextForm text={userText} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { id: params?.id } }
}
