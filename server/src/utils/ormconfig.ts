import { ConnectionOptions } from 'typeorm'
import {
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} from '../../../utils/env'

import { DatabaseLogger } from '../../../utils/log'

export default {
  type: 'postgres',
  host: process.env.NODE_ENV === 'production' ? 'database' : 'localhost',
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ['dist/entity/*/*.js'],
  migrations: ['dist/server/src/migration/*.js'],
  migrationsRun: true,
  logger: new DatabaseLogger(),
  maxQueryExecutionTime: 1000,
  cli: { entitiesDir: '../entity', migrationsDir: 'src/migration' },
} as ConnectionOptions
