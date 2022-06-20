import { CircularProgress, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Head from "next/head"

export default function LiteratureFallback() {
  const classes = useStyles()
  return (
    <>
      <Head>
        <title>Lexico - Literature...</title>
        <meta name="description" content={`Read and translate literature`} />
        <meta
          name="keywords"
          content={`Latin, Literature, Read, English, Translation,`}
        />
      </Head>
      <style jsx global>{`
        body#body {
          background-color: black;
        }
      `}</style>
      <Paper square elevation={0} className={classes.reader}>
        <CircularProgress size={60} thickness={5.4} color="secondary" />
      </Paper>
    </>
  )
}

const useStyles = makeStyles(() => ({
  reader: {
    backgroundColor: "black",
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}))
