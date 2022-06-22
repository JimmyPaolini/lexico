import { Connection, createConnection } from 'typeorm'

import { POSTGRES_DB } from './env'
import log from './log'
import ormconfig from './ormconfig'

export async function connectDatabase(): Promise<Connection> {
  const connection = await createConnection(ormconfig)
  connection.query(
    `ALTER DATABASE ${POSTGRES_DB} SET log_min_duration_statement = 1000`,
  )
  log.info('connected to database')
  return connection
}
