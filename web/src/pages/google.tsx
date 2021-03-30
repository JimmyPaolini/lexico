import { print } from "graphql"
import { rawRequest } from "graphql-request"
import { GetServerSideProps } from "next"
import googleQuery from "../graphql/authentication/google.graphql"
import { serverEndpoint } from "./api"

export default function google() {}

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
  if (!errors) res.setHeader("set-cookie", headers.get("set-cookie")!)

  res.writeHead(302, { Location: "/user" })
  res.end()
  return { props: {} }
}
