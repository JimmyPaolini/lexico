import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import 'reflect-metadata'

import log from '../../utils/log'
import { buildAPI } from './utils/api'
import { corsOptions } from './utils/cors'
import { Database } from './utils/database'

async function main() {
  await Database.initialize()

  const app = express()
  app.use(cors(corsOptions))
  app.use(cookieParser())
  app.get('/health', (_, res) => res.send('check'))

  await buildAPI(app, corsOptions)

  app.listen('3001', () =>
    log.info(
      `listening at http://${
        process.env.NODE_ENV === 'production' ? 'server' : 'localhost'
      }:3001/`,
    ),
  )
}
void main()
