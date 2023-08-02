import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { FormikErrors, useFormik } from 'formik'

import { TOOLS } from './Tools.constants'

type TextToolsForm = {
  input: string
  tools: (keyof typeof TOOLS)[]
}

export const useToolsForm = () => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      input: router.query.input,
      tools: [],
    } as TextToolsForm,
    onSubmit: async ({ tools, input }, formik) => {
      for (const tool of tools) {
        input = await TOOLS[tool].action(input)
      }
      formik.setFieldValue('input', input)
      router.replace({ query: { ...router.query, input } }, undefined, {
        shallow: true,
      })
    },
    validate: ({ input, tools }) => {
      const errors = {} as FormikErrors<TextToolsForm>
      if (input?.length > 2500) {
        errors.input = 'Text must be under 2500 characters'
      }
      if (!tools.length) {
        errors.input = 'Please choose one or more tools'
      }
      return errors
    },
  })

  useEffect(() => {
    formik.setFieldValue('input', router.query.input)
  }, [router.query.input])

  return formik
}
