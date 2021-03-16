// import express from "express"
// import next from "next"
// import { SERVER_HOST } from "../../utils/env"

// const server = next({
//   dev: process.env.NODE_ENV !== "production",
//   conf: {
//     webpack: (config: any, { isServer }: any) => {
//       config.module.rules.push({
//         test: /\.(graphql|gql)$/,
//         exclude: /node_modules/,
//         loader: "graphql-tag/loader",
//       })
//       if (!isServer) {
//         config.node = {
//           fs: "empty",
//         }
//       }
//       return config
//     },
//   } as any,
// })

// async function main() {
//   await server.prepare()
//   const app = express()
//   app.all("*", (req, res) => server.getRequestHandler()(req, res))
//   app.listen(3000, () => console.log(`listening at http://${SERVER_HOST}:3000`))
// }
// main()
export {}
