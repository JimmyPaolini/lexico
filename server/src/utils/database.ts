import { Connection, createConnection } from 'typeorm'

import ormconfig from './ormconfig'
import log from '../../../utils/log'

export async function connectDatabase(): Promise<Connection> {
  const connection = await createConnection(ormconfig)
  connection.query(
    `ALTER DATABASE ${process.env.POSTGRES_DB} SET log_min_duration_statement = 1000`,
  )
  log.info('connected to database')
  return connection
}
