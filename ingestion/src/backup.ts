import { connectDatabase } from "../../utils/database"
import log from "../../utils/log"
import {
  backupAll,
  backupDictionary,
  backupIngested,
  backupLiterature,
  backups,
  backupUsers,
} from "./utils/backup"

async function main() {
  const [, , command] = process.argv
  if (!command) throw new Error("no command")

  await connectDatabase()

  const instructions = {
    dictionary: () => backupDictionary(),
    literature: () => backupLiterature(),
    ingested: () => backupIngested(),
    users: () => backupUsers(),
    all: () => backupAll(),
    list: () => log.info({ backups: backups() }),
  } as { [key: string]: () => any }

  await instructions[command]()
}
main().finally(() => process.exit())
