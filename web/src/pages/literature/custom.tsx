import Head from "next/head"
import { memo } from "react"
import CustomLiteratureForm from "../../components/literature/custom/CustomLiteratureForm"
import { CustomText } from "../../utils/literatureLocal"

interface CustomReaderNewProps {
  text?: CustomText
}
export default memo(function CustomReaderNew({
  text,
}: CustomReaderNewProps): JSX.Element {
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
})
