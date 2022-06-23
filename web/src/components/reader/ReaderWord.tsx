import { memo } from 'react'

import { styled } from '@mui/material/styles';

import { CardActionArea } from '@mui/material'
const PREFIX = 'ReaderWord';

const classes = {
  readerWord: `${PREFIX}-readerWord`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(() => ({
  [`& .${classes.readerWord}`]: {
    display: 'inline',
    cursor: 'pointer',
    borderRadius: 4,
    verticalAlign: 'top',
  }
}));

type Props = {
  word: string
  openModal: (word: string) => void
}

export default memo(function ReaderWord({ word, openModal }: Props) {

  const isWord = word.match(/\w+/i)

  return isWord ? (
    <CardActionArea
      className={classes.readerWord}
      component="span"
      onClick={() => openModal(word.toLowerCase())}
    >
      {word}
    </CardActionArea>
  ) : (
    (<Root>{word}</Root>)
  );
})
