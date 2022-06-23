import { CircularProgress, Paper } from '@mui/material'
import { styled } from '@mui/material/styles';

import Head from 'next/head'

const PREFIX = 'LiteratureFallback';

const classes = {
  reader: `${PREFIX}-reader`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(() => ({
  [`& .${classes.reader}`]: {
    backgroundColor: 'black',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

export default function LiteratureFallback() {

  return (
    (<Root>
      <Head>
        <title>Lexico - Literature...</title>
        <meta name="description" content={`Read and translate literature`} />
        <meta
          name="keywords"
          content={`Latin, Literature, Read, English, Translation,`}
        />
      </Head>
      <style jsx global>{`
        body#body {
          background-color: black;
        }
      `}</style>
      <Paper square elevation={0} className={classes.reader}>
        <CircularProgress size={60} thickness={5.4} color="secondary" />
      </Paper>
    </Root>)
  );
}
