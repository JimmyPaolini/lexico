import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import 'reflect-metadata'

import { initializeGraphqlApi } from './config/api'
import { corsOptions } from './config/cors'
import { Database } from './config/database'
import log from './services/log'

async function main() {
  await Database.initialize()

  const app = express()
  app.use(cors(corsOptions))
  app.use(cookieParser())
  app.get('/health', (_, res) => res.send('check'))

  await initializeGraphqlApi(app, corsOptions)

  app.listen('3001', () =>
    log.info(
      `listening at http://${
        process.env.NODE_ENV === 'production' ? 'server' : 'localhost'
      }:3001/`
    )
  )
}
void main()
