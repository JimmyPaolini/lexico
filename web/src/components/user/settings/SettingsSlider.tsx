import { Slider } from "@material-ui/core"
import React from "react"

interface Props {
  formik: any
}
export default function SettingsSlider({ formik }: Props): JSX.Element {
  const min = 16
  const max = 32
  const marks = new Array((max - min) / 2 + 1)
    .fill(0)
    .map((_, i) => ({ value: i * 2 + min, label: "" + (i * 2 + min) }))

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    event.target.name = "fontSize"
    event.target.value = newValue
    formik.handleChange(event)
  }

  return (
    <Slider
      id="fontSize"
      name="fontSize"
      value={formik.values.fontSize}
      onChange={handleSliderChange}
      onChangeCommitted={() => formik.handleSubmit()}
      valueLabelDisplay="off"
      min={min}
      max={max}
      marks={marks}
      step={2}
    />
  )
}
