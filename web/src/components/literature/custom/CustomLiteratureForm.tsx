import { Grid, IconButton, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Menu from "@material-ui/icons/Menu"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import { memo, useContext } from "react"
import { v4 as uuid } from "uuid"
import { useCreateCustomTextMutation } from "../../../graphql/generated"
import { MyTheme } from "../../../theme"
import {
  createCustomTextLocal,
  CustomText,
} from "../../../utils/literatureLocal"
import SubmitButton from "../../accessories/SubmitButton"
import TextBox from "../../accessories/TextBox"
import { Context } from "../../layout/Context"

interface CustomLiteratureFormProps {
  text?: CustomText
}
export default memo(function CustomLiteratureForm({
  text,
}: CustomLiteratureFormProps) {
  const classes = useStyles()
  const { isMobile, isNavOpen, setNavOpen } = useContext(Context)

  const router = useRouter()
  const formik = useFormik<CustomText>({
    initialValues: text || { id: uuid(), title: "", text: "" },
    validate,
    onSubmit: async () => {
      try {
        if (!text || text.local) createCustomTextLocal(formik.values)
        else await createCustomText(formik.values)
        router.replace(`/reader/custom/` + formik.values.id)
      } catch {
        formik.setStatus("Error creating custom text")
      }
    },
  })
  const { mutateAsync: createCustomText } = useCreateCustomTextMutation()

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        direction="column"
        wrap="nowrap"
        className={classes.customReader}
      >
        <Grid
          item
          container
          wrap="nowrap"
          alignItems="center"
          className={classes.item}
        >
          {isMobile ? (
            <IconButton
              onClick={() => setNavOpen(!isNavOpen)}
              style={{ marginRight: 8 }}
              aria-label="menu"
            >
              <Menu />
            </IconButton>
          ) : null}
          <TextBox name="title" formik={formik} color="secondary" autoFocus />
        </Grid>
        <Typography align="center" className={classes.item}>
          Line Numbers are automatically assigned to each line;
          <br />
          Line Labels can be manually assigned by starting a line with a #Label
        </Typography>
        <TextBox
          name="text"
          formik={formik}
          color="secondary"
          multiline
          minRows={4}
          className={classes.item}
          style={{ flexGrow: 1 }}
          InputProps={{ style: { height: "100%", alignItems: "flex-start" } }}
          inputProps={{ style: { height: "100%", overflow: "inherit" } }}
          placeholder={`automatically numbered line\n#LBL manually labelled line`}
        />
        <SubmitButton name="Save" className={classes.item} />
      </Grid>
    </form>
  )
})

export function validate({ title, text }: CustomText): CustomText {
  const errors = {} as CustomText
  if (!title) errors.title = "Title cannot be empty"
  if (!text) errors.text = "Text cannot be empty"
  if (title.length >= 100)
    errors.title = "Title must be less than 100 characters"
  if (text.length >= 100000)
    errors.text = "Text must be less than 100,000 characters"
  return errors
}

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
