import { Connection, DataSource, createConnection } from 'typeorm'

import {
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} from '../../../utils/env'
import log, { DatabaseLogger } from '../../../utils/log'
import ormconfig from './ormconfig'

export async function connectDatabase(): Promise<Connection> {
  const connection = await createConnection(ormconfig)
  await connection.query(
    `ALTER DATABASE ${process.env.POSTGRES_DB} SET log_min_duration_statement = 1000`,
  )
  log.info('connected to database')
  return connection
}

export const Database = new DataSource({
  type: 'postgres',
  host: process.env.NODE_ENV === 'production' ? 'database' : 'localhost',
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ['dist/server/src/entity/*/*.js'],
  migrations: ['dist/server/src/migration/*.js'],
  migrationsRun: true,
  logger: new DatabaseLogger(),
  maxQueryExecutionTime: 1000,
})
