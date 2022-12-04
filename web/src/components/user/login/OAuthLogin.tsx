import { Button } from '@mui/material'

import { signIn } from 'next-auth/react'
import Image from 'next/image'

import { sentenceCase } from 'src/utils/string'

type Props = { provider: string }

export const OAuthLogin = ({ provider }: Props) => {
  // const href = provider === 'google' ? useGoogleUrl() : useFacebookUrl()
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      disableElevation
      onClick={() => signIn(provider)}
      startIcon={
        <Image
          src={`/icon/${provider}.png`}
          alt={`${provider} logo`}
          height={24}
          width={24}
          priority
          loading="eager"
        />
      }
    >
      {`Sign in with ${sentenceCase(provider)}`}
    </Button>
  )
}
