import { Button } from "@material-ui/core"
import Image from "next/image"
import React from "react"
import { sentenceCase } from "../../../utils/string"

type Props = {
  provider: string
}
export default function OAuthLogin({ provider }: Props) {
  const href = provider === "google" ? useGoogleUrl() : useFacebookUrl()
  return (
    <Button
      variant="contained"
      color="primary"
      disableElevation
      size="large"
      href={href}
      target="_top"
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

function useGoogleUrl() {
  if (typeof window === "undefined") return ""
  return (
    "https://accounts.google.com/o/oauth2/auth" +
    "?response_type=code" +
    "&client_id=581175821772-acc3epk92kl7n8bna0m6md2p4gvtrfpa.apps.googleusercontent.com" +
    "&scope=email" +
    "&redirect_uri=" +
    encodeURIComponent(window.location.origin + "/google")
  )
}

function useFacebookUrl() {
  if (typeof window === "undefined") return ""
  return (
    "https://www.facebook.com/v3.2/dialog/oauth" +
    "?response_type=code" +
    "&client_id=1348031495536829" +
    "&scope=email" +
    "&redirect_uri=" +
    encodeURIComponent(window.location.origin + "/facebook")
  )
}
