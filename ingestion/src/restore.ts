import { connectDatabase } from "../../utils/database"
import {
  backups,
  restoreAll,
  restoreDictionary,
  restoreLiterature,
  restoreUsers,
} from "./utils/backup"

async function main() {
  const [, , command] = process.argv
  if (!command) throw new Error("no command")

  await connectDatabase()

  const instructions = {
    dictionary: () => restoreDictionary(process.argv[3]),
    literature: () => restoreLiterature(process.argv[3]),
    users: () => restoreUsers(process.argv[3]),
    all: () => restoreAll(process.argv[3]),
    latestDictionary: async () => {
      const latestDictionaryBackup = backups(/dictionary/i)[0]
      await restoreDictionary(latestDictionaryBackup)
    },
    latestLiterature: async () => {
      const latestLiteratureBackup = backups(/literature/i)[0]
      await restoreLiterature(latestLiteratureBackup)
    },
    latestUsers: async () => {
      const latestUsersBackup = backups(/users/i)[0]
      await restoreUsers(latestUsersBackup)
    },
    latestAll: async () => {
      const latestAllBackup = backups(/all/i)[0]
      await restoreAll(latestAllBackup)
    },
  } as { [key: string]: () => any }

  await instructions[command]()
  process.exit()
}
main()
