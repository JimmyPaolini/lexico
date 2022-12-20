import { Connection, createConnection } from 'typeorm'

import log from '../../../utils/log'
import ormconfig from './ormconfig'

export async function connectDatabase(): Promise<Connection> {
  const connection = await createConnection(ormconfig)
  await connection.query(
    `ALTER DATABASE ${process.env.POSTGRES_DB} SET log_min_duration_statement = 1000`,
  )
  log.info('connected to database')
  return connection
}
