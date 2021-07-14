import { print } from "graphql"
import { rawRequest } from "graphql-request"
import { GetServerSideProps } from "next"
import googleQuery from "../graphql/authentication/google.graphql"
import { googleAnalyticsEvent } from "../utils/googleAnalytics"
import { serverEndpoint } from "./api"

export default function google(): JSX.Element {
  return <></>
}
export const getServerSideProps: GetServerSideProps = async ({
  query: { code },
  res,
}) => {
  const { headers, errors } = await rawRequest(
    serverEndpoint,
    print(googleQuery),
    {
      code,
    },
  )
  const cookieHeader = headers.get("set-cookie")
  if (!errors && cookieHeader) res.setHeader("set-cookie", cookieHeader)

  googleAnalyticsEvent("login", {
    category: "user",
    label: "oauth",
    value: "google",
  })

  res.writeHead(302, { Location: "/user" })
  res.end()
  return { props: {} }
}
