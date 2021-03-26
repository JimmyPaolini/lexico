import { readdirSync } from "fs"
import { connectDatabase } from "../../utils/database"
import log from "../../utils/log"
import {
  backupAll,
  backupDictionary,
  backupFileNameExtension,
  backupLiterature,
  backupUsers,
} from "./utils/backup"
import { createDbViews } from "./utils/database"

async function main() {
  const [, , command] = process.argv
  if (!command) throw new Error("no command")

  await connectDatabase()
  await createDbViews()

  const instructions = {
    dictionary: () => backupDictionary(),
    literature: () => backupLiterature(),
    users: () => backupUsers(),
    all: () => backupAll(),
    list: () => log.info({ backups: backups() }),
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
