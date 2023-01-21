import { useRef } from 'react'

import VolumeUp from '@mui/icons-material/VolumeUp'
import { CircularProgress, IconButton, useTheme } from '@mui/material'

import { useSpeakQuery } from '../../graphql/generated'

type Props = { text: string }

export const SpeakIconButton = ({ text }: Props) => {
  const theme = useTheme()

  const audioRef = useRef<HTMLAudioElement>(null)
  const {
    data,
    refetch: speak,
    isLoading: isAudioLoading,
  } = useSpeakQuery({ text }, { enabled: false })
  const rawAudioData = data?.speak

  const handlePlay = () => {
    speak()
    audioRef.current?.play()
  }

  return (
    <IconButton
      onClick={handlePlay}
      sx={{ padding: theme.spacing(1), marginLeft: theme.spacing(0.5) }}
      size="large"
      aria-label="speak"
    >
      {rawAudioData && (
        <audio ref={audioRef}>
          <source
            type="audio/mpeg"
            src={`data:audio/mp3;base64,${rawAudioData}`}
          />
        </audio>
      )}
      {!isAudioLoading ? (
        <VolumeUp fontSize="large" />
      ) : (
        <CircularProgress
          size={theme.spacing(3)}
          thickness={5.4}
          color="secondary"
        />
      )}
    </IconButton>
  )
}
