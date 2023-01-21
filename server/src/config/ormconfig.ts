import { DataSourceOptions } from 'typeorm'

import { DatabaseLogger } from '../../../utils/log'

export default {
  type: 'postgres',
  host: process.env.NODE_ENV === 'production' ? 'database' : 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/server/src/entity/*/*.js'],
  migrations: ['dist/server/src/migration/*.js'],
  migrationsRun: true,
  logger: new DatabaseLogger(),
  maxQueryExecutionTime: 1000,
  cli: { entitiesDir: 'src/entity', migrationsDir: 'src/migration' },
} as DataSourceOptions
