import { connectDatabase } from "../../utils/database"
import log from "../../utils/log"
import {
  backups,
  restoreAll,
  restoreDictionary,
  restoreIngested,
  restoreLiterature,
  restoreUsers,
} from "./utils/pg-commands"

async function main() {
  const [, , command] = process.argv
  if (!command) throw new Error("no command")

  await connectDatabase()

  const instructions = {
    dictionary: async () => {
      const dictionaryBackup = process.argv?.[3] || backups(/dictionary/i)[0]
      log.info(`restoring ${dictionaryBackup}`)
      await restoreDictionary(dictionaryBackup)
    },
    literature: async () => {
      const literatureBackup = process.argv?.[3] || backups(/literature/i)[0]
      log.info(`restoring ${literatureBackup}`)
      await restoreLiterature(literatureBackup)
    },
    ingested: async () => {
      const ingestedBackup = process.argv?.[3] || backups(/ingested/i)[0]
      log.info(`restoring ${ingestedBackup}`)
      await restoreIngested(ingestedBackup)
    },
    users: async () => {
      const usersBackup = process.argv?.[3] || backups(/users/i)[0]
      log.info(`restoring ${usersBackup}`)
      await restoreUsers(usersBackup)
    },
    all: async () => {
      const allBackup = process.argv?.[3] || backups(/all/i)[0]
      log.info(`restoring ${allBackup}`)
      await restoreAll(allBackup)
    },
  } as { [key: string]: () => any }

  await instructions[command]()
  process.exit()
}
main()
