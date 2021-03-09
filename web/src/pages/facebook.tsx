import { print } from "graphql"
import { GetServerSideProps } from "next"
import facebookQuery from "../graphql/authentication/facebook.graphql"
import { graphQLClient } from "./_app"

export default function facebook() {}

export const getServerSideProps: GetServerSideProps = async ({
  query: { code },
  res,
}) => {
  const { headers, errors } = await graphQLClient.rawRequest(
    print(facebookQuery),
    { code },
  )
  if (!errors) res.setHeader("set-cookie", headers.get("set-cookie")!)

  res.writeHead(302, { Location: "/user" })
  res.end()
  return { props: {} }
}
