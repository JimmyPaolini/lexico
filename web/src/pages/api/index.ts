import type { NextApiRequest, NextApiResponse } from "next"
import { SERVER_HOST } from "../../../../utils/env"

// function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) return reject(result)
//       else return resolve(result)
//     })
//   })
// }

export default async (_: NextApiRequest, res: NextApiResponse) => {
  // await runMiddleware(req, res, cors({ credentials: true }))
  res.redirect(`http://${SERVER_HOST}:3001/graphql`)
}
