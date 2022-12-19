import Head from 'next/head'

import { CustomText } from 'src/utils/literatureLocal'

import { CustomLiteratureForm } from '../../components/library/custom/CustomLiteratureForm'

type Props = { text?: CustomText }

export default function CustomReaderNew({ text }: Props) {
  return (
    <>
      <Head>
        <title>Lexico - Literature: Custom</title>
        <meta
          name="description"
          content={`Read and translate your own literature with Lexico for better flow`}
        />
        <meta
          name="keywords"
          content={`Latin, Literature, Read, English, Translation, Custom`}
        />
      </Head>
      <style jsx global>{`
        body#body {
          background-color: black;
        }
      `}</style>
      <CustomLiteratureForm text={text} />
    </>
  )
}