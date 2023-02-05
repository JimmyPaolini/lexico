import Head from 'next/head'
import { useRouter } from 'next/router'

import { GetServerSideProps } from 'next'

import { getUserTextLocal } from 'src/components/library/UserTextsCard/UserTexts'
import { UserTextForm } from 'src/components/reader/UserTextForm/UserTextForm'
import {
  CustomText,
  UserTextDocument,
  UserTextQuery,
  UserTextQueryVariables,
} from 'src/graphql/generated'

import { fetcher } from '../../../graphql/fetcher'

type Props = { userText: CustomText }

export default function UserTextEditor({ userText: userTextRemote }: Props) {
  const router = useRouter()
  const userTextId = router.asPath
    .replace(/^\/userText\//, '')
    .replace(/\/edit$/, '')
  const userTextLocal = getUserTextLocal(userTextId)

  const userText = userTextRemote ?? userTextLocal

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
