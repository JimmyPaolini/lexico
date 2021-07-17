import { Grid, IconButton, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Menu from "@material-ui/icons/Menu"
import { useFormik } from "formik"
import Head from "next/head"
import { useRouter } from "next/router"
import { memo, useContext } from "react"
import { v4 as uuid } from "uuid"
import SubmitButton from "../../components/accessories/SubmitButton"
import TextBox from "../../components/accessories/TextBox"
import { Context } from "../../components/layout/Context"
import { MyTheme } from "../../theme/theme"
import { createLiteratureLocal, CustomText } from "../../utils/localLiterature"

interface CustomReaderNewProps {
  text?: CustomText
}
export default memo(function CustomReaderNew({
  text,
}: CustomReaderNewProps): JSX.Element {
  const classes = useStyles()
  const { isMobile, isNavOpen, setNavOpen } = useContext(Context)

  const router = useRouter()
  const formik = useFormik<CustomText>({
    initialValues: text || { id: uuid(), title: "", text: "" },
    onSubmit: async () => {
      createLiteratureLocal(formik.values)
      router.replace(`/reader/custom/` + formik.values.id)
    },
  })

  return (
    <>
      <Head>
        <title>Lexico - Literature: New</title>
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
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          direction="column"
          wrap="nowrap"
          className={classes.customReader}>
          <Grid
            item
            container
            wrap="nowrap"
            alignItems="center"
            className={classes.item}>
            {isMobile ? (
              <IconButton
                onClick={() => setNavOpen(!isNavOpen)}
                style={{ marginRight: 8 }}
                aria-label="menu">
                <Menu />
              </IconButton>
            ) : null}
            <TextBox name="title" formik={formik} color="secondary" autoFocus />
          </Grid>
          <Typography align="center" className={classes.item}>
            Line Numbers are automatically assigned to each line;
            <br />
            Line Labels can be manually assigned by starting a line with a
            #Label
          </Typography>
          <TextBox
            name="text"
            formik={formik}
            color="secondary"
            multiline
            className={classes.item}
            style={{ flexGrow: 1 }}
            InputProps={{ style: { height: "100%", alignItems: "flex-start" } }}
            placeholder={`automatically numbered line\n#LBL manually labelled line`}
          />
          <SubmitButton name="Save" className={classes.item} />
        </Grid>
      </form>
    </>
  )
})

const useStyles = makeStyles((theme: MyTheme) => ({
  customReader: {
    width: "100%",
    maxWidth: theme.custom.cardWidth * 2,
    height: "100vh",
    padding: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "black",
  },
  item: {
    marginBottom: theme.spacing(2),
  },
}))
