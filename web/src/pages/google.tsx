import { print } from "graphql"
import { GetServerSideProps } from "next"
import googleQuery from "../graphql/authentication/google.gql"
import { graphQLClient } from "./_app"

export default function google() {}

export const getServerSideProps: GetServerSideProps = async ({
  query: { code },
  res,
}) => {
  const { headers, errors } = await graphQLClient.rawRequest(
    print(googleQuery),
    { code },
  )
  if (!errors) res.setHeader("set-cookie", headers.get("set-cookie")!)

  res.writeHead(302, { Location: "/settings" })
  res.end()
  return { props: {} }
}
