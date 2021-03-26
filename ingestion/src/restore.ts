import { readdirSync } from "fs"
import { connectDatabase } from "../../utils/database"
import {
  backupFileNameExtension,
  restoreAll,
  restoreDictionary,
  restoreLiterature,
  restoreUsers,
} from "./utils/backup"
import { createDbViews } from "./utils/database"

async function main() {
  const [, , command] = process.argv
  if (!command) throw new Error("no command")

  await connectDatabase()
  await createDbViews()

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

const backups = (filter?: RegExp) =>
  readdirSync(`data/backup`)
    .filter((fileName) => !fileName.match(/\.DS_Store/))
    .filter((fileName) => fileName.match(filter || /[\s\S]*/))
    .map((fileName) => fileName.replace(backupFileNameExtension, ""))
    .sort()
    .reverse()
