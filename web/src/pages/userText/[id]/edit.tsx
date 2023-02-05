import Head from 'next/head'

import { GetServerSideProps } from 'next'

import { getUserTextLocal } from 'src/components/library/UserTextsCard/UserTexts'
import { UserTextForm } from 'src/components/reader/UserTextForm/UserTextForm'
import { CustomText, useUserTextQuery } from 'src/graphql/generated'

type Props = { id: string }

export default function UserTextEditor({ id }: Props) {
  const { data } = useUserTextQuery({ id })
  const remoteText = data?.userText

  const localText = getUserTextLocal(id)

  const userText = (remoteText ? remoteText : localText) as CustomText

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
      <UserTextForm text={userText} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { id: params?.id } }
}
