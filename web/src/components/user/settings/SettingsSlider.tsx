import { Slider } from '@mui/material'

import { FormikProps } from 'formik'

import { Settings } from 'src/graphql/generated'

type Props = { formik: FormikProps<Settings> }

export const SettingsSlider = ({ formik }: Props) => {
  const MIN = 16
  const MAX = 32
  const marks = new Array((MAX - MIN) / 2 + 1)
    .fill(0)
    .map((_, i) => ({ value: i * 2 + MIN, label: '' + (i * 2 + MIN) }))

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    formik.handleChange({
      ...event,
      target: {
        ...event.target,
        name: 'fontSize',
        value: newValue,
      },
    })
  }

  return (
    <Slider
      id="fontSize"
      name="fontSize"
      value={formik.values.fontSize as number}
      onChange={handleSliderChange}
      onChangeCommitted={() => formik.handleSubmit()}
      valueLabelDisplay="off"
      min={MIN}
      max={MAX}
      marks={marks}
      step={2}
    />
  )
}
