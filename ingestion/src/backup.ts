import { connectDatabase } from '../../utils/database'
import log from '../../utils/log'
import {
  backupAll,
  backupDictionary,
  backupIngested,
  backupLiterature,
  backupUsers,
  backups,
} from './utils/pg-commands'

async function main() {
  const [, , command] = process.argv
  if (!command) throw new Error('no command')

  await connectDatabase()

  const instructions = {
    dictionary: () => backupDictionary(),
    literature: () => backupLiterature(),
    ingested: () => backupIngested(),
    users: () => backupUsers(),
    all: () => backupAll(),
    list: () => log.info({ backups: backups() }),
  } as { [key: string]: () => unknown }

  await instructions[command]()
  process.exit()
}
main()
