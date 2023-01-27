import Head from 'next/head'

import { CircularProgress, Paper } from '@mui/material'

export const ReaderLoading = () => {
  return (
    <>
      <Head>
        <title>Lexico - Library...</title>
        <meta name="description" content={'Read and translate literature'} />
        <meta
          name="keywords"
          content={'Latin, Literature, Read, English, Translation,'}
        />
      </Head>
      <style>{`
        body#body {
          background-color: black;
        }
      `}</style>
      <Paper
        square
        elevation={0}
        sx={{
          background: 'black',
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={60} thickness={5.4} color="secondary" />
      </Paper>
    </>
  )
}