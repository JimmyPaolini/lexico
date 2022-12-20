import { DataSource } from 'typeorm'

import ormconfig from './ormconfig'

export const Database = new DataSource(ormconfig)
