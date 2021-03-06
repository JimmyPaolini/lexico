import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import "reflect-metadata"
import { connectDatabase } from "../../utils/database"
import { PORT } from "../../utils/env"
import log from "../../utils/log"
import buildAPI from "./utils/api"
import { createDbViews } from "./utils/database"

async function main() {
  const isProd = process.env.NODE_ENV === "production"
  if (isProd) log.info("environment is production")

  await connectDatabase()
  await createDbViews()

  const app = express()
  const corsOptions = {
    credentials: true,
    origin: [`http://localhost:3000`, "https://lexicolatin.com"],
  }
  app.use(cors(corsOptions))
  app.use(cookieParser())
  app.get("/health", (_, res) => res.send("ok"))

  await buildAPI(app, corsOptions)

  app.listen(PORT, () => log.info(`listening at http://localhost:${PORT}`))
}
main()
