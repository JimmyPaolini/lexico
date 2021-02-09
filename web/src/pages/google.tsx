import { useRouter } from "next/router"
import { useQuery } from "react-query"
import googleQuery from "../graphql/google.gql"
import { graphQLClient } from "./_app"

export default function googleCallback() {
  const router = useRouter()
  const code = router.query.code as string
  if (!code) return <></>
  const { data: user, isSuccess } = useQuery("google", async () => {
    const { google: data } = await graphQLClient.request(googleQuery, { code })
    return data
  })
  console.log(user)
  if (isSuccess) router.push("/settings")
  return <></>
}

// interface ServerSideProps {
//   query: {
//     code: string
//   }
//   req: IncomingMessage
//   res: ServerResponse
// }
// export async function getServerSideProps({
//   query: { code },
//   req,
//   res,
// }: ServerSideProps) {
//   const {google: user} = await graphQLClient.request(googleQuery, { code })
//   const cookies = new Cookies(req, res)
//   console.log("cookies", cookies)
//   if (user) {
//     return {
//       redirect: {
//         destination: "/settings",
//       },
//     }
//   } else {
//     return { isSuccess: false }
//   }
// }
