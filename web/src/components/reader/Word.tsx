import { CardActionArea } from '@mui/material'

type Props = { word: string, openModal: (word: string) => void }

export const Word = ({ word, openModal }: Props) => {
  const isWord = word.match(/\w+/i)

  return isWord
    ? (
    <CardActionArea
      sx={{
        display: 'inline',
        cursor: 'pointer',
        borderRadius: 2,
        verticalAlign: 'top',
      }}
      component="span"
      onClick={() => openModal(word.toLowerCase())}
    >
      {word}
    </CardActionArea>
      )
    : (<>{word}</>)
}
