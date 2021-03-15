import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import "reflect-metadata"
import { connectDatabase } from "../../utils/database"
import { SERVER_HOST, WEB_HOST } from "../../utils/env"
import log from "../../utils/log"
import buildAPI from "./utils/api"

async function main() {
  if (process.env.NODE_ENV === "production")
    log.info("environment is production")

  await connectDatabase()

  const app = express()
  const corsOptions = {
    credentials: true,
    origin: [
      `http://localhost:3000/`,
      `http://${WEB_HOST}:3000/`,
      "https://lexicolatin.com/",
    ],
  }
  app.use(cors(corsOptions))
  app.use(cookieParser())
  app.get("/health", (_, res) => res.send("check"))

  await buildAPI(app, corsOptions)

  app.listen("3001", () => log.info(`listening at http://${SERVER_HOST}:3001/`))
}
main()
