import { useRef } from 'react'

import { useRouter } from 'next/router'

import Transform from '@mui/icons-material/Transform'
import VolumeUp from '@mui/icons-material/VolumeUp'
import { CardContent, Grid, Typography, useTheme } from '@mui/material'

import { useSpeechQuery } from 'src/graphql/generated'

import { SubmitButton } from '../../accessories/SubmitButton'
import { TextBox } from '../../accessories/TextBox'
import { Tool } from './Tool'
import { ToolGroup } from './ToolGroup'
import { useToolsForm } from './useToolsForm'

export const ToolsForm = () => {
  const theme = useTheme()
  const router = useRouter()
  const formik = useToolsForm()

  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlay = async () => {
    const source = audioRef.current?.querySelector('source')
    if (!audioRef.current || !source) return
    const data = await useSpeechQuery.fetcher({ text: formik.values.input })()
    source.src = `data:audio/mp3;base64,${data.speech}`
    audioRef.current.load()
    audioRef.current.play()
    router.replace(
      { query: { ...router.query, input: formik.values.input } },
      undefined,
      { shallow: true }
    )
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(1),
        }}
      >
        <TextBox
          name="input"
          formik={formik}
          disabled={formik.isSubmitting}
          multiline
          rows={6}
        />
        {formik.values.input?.match(/[ÄËÏÖÜäëïöü]/) && (
          <Typography align="center">ÄËÏÖÜäëïöü = ambiguous macron</Typography>
        )}
        <ToolGroup tools={['macronize', 'demacronize']} formik={formik} />
        <ToolGroup tools={['capitalize', 'uncapitalize']} formik={formik} />
        <Grid container gap={1} justifyContent="center" wrap="nowrap">
          <Tool tool="u2v" formik={formik} />
          <Tool tool="i2j" formik={formik} />
        </Grid>
        <Grid container gap={1} wrap="nowrap">
          <SubmitButton
            name="Transform"
            disabled={formik.isSubmitting}
            endIcon={<Transform />}
          />
          <audio ref={audioRef} autoPlay>
            <source type="audio/mpeg" />
          </audio>
          <SubmitButton
            type="button"
            name="Speak"
            disabled={formik.isSubmitting}
            onClick={handlePlay}
            endIcon={<VolumeUp />}
          />
        </Grid>
      </CardContent>
    </form>
  )
}
