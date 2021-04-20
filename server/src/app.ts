import cookieParser from "cookie-parser"
import cors, { CorsOptions } from "cors"
import express from "express"
import "reflect-metadata"
import { connectDatabase } from "../../utils/database"
import log from "../../utils/log"
import buildAPI from "./utils/api"

async function main() {
  await connectDatabase()

  const app = express()
  const corsOptions = {
    credentials: true,
    origin: [
      `http://${
        process.env.NODE_ENV === "production" ? "web" : "localhost"
      }:3000/`,
      "https://lexicolatin.com/",
    ],
  } as CorsOptions
  app.use(cors(corsOptions))
  app.use(cookieParser())
  app.get("/health", (_, res) => res.send("check"))

  await buildAPI(app, corsOptions)

  app.listen("3001", () =>
    log.info(
      `listening at http://${
        process.env.NODE_ENV === "production" ? "server" : "localhost"
      }:3001/`,
    ),
  )
}
main()
