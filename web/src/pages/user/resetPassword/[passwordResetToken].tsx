import { GetServerSideProps } from "next"
import React from "react"
import SingleCardLayout from "../../../components/layout/SingleCardLayout"
import ResetPasswordCard from "../../../components/user/login/ResetPasswordCard"
import validatePasswordResetTokenQuery from "../../../graphql/user/login/validatePasswordResetToken.graphql"
import { graphQLClient } from "../../_app"

interface Props {
  passwordResetToken: string
}
export default function ResetPassword({
  passwordResetToken,
}: Props): JSX.Element {
  return (
    <SingleCardLayout>
      <ResetPasswordCard passwordResetToken={passwordResetToken} />
    </SingleCardLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const passwordResetToken = context.params?.passwordResetToken
  try {
    const { validatePasswordResetToken } = await graphQLClient.request(
      validatePasswordResetTokenQuery,
      {
        passwordResetToken,
      },
    )
    if (!validatePasswordResetToken) {
      console.error("invalid password reset token")
      return { notFound: true }
    }
  } catch {
    console.error("invalid password reset token")
    return { notFound: true }
  }
  console.log("valid password reset token")
  return { props: { passwordResetToken } }
}
