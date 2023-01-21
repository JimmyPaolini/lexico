import { useRouter } from 'next/router'

import { FormikErrors, useFormik } from 'formik'

import { TOOLS } from './Tools.constants'

type ToolsForm = {
  text: string
  tools: (keyof typeof TOOLS)[]
}

export const useToolsForm = () => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      text: router.query.text,
      tools: [],
    } as ToolsForm,
    onSubmit: async ({ tools, text }, formik) => {
      for (const tool of tools) {
        text = await TOOLS[tool].action(text)
      }
      formik.setFieldValue('text', text)
      router.replace({ query: { text } })
    },
    validate: ({ text, tools }) => {
      const errors = {} as FormikErrors<ToolsForm>
      if (text?.length > 2500) {
        errors.text = 'Text must be under 2500 characters'
      }
      if (!tools.length) {
        errors.tools = 'Please choose one or more tools'
      }
      return errors
    },
  })

  return formik
}
