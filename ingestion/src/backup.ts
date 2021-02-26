import { readdirSync } from "fs"
import {
  backupDatabase,
  backupFileNameExtension,
  connectDatabase,
  restoreDatabase,
} from "./utils/database"
import logger from "./utils/log"

const log = logger.getChildLogger()

async function main() {
  const command = process.argv[2]
  if (!command) throw new Error("no command")

  await connectDatabase()

  const commandMap = {
    database: () => backupDatabase("manual"),
    list: () => {
      log.info(
        readdirSync(`data/backup`)
          .filter((fileName) => !fileName.match(/\.DS_Store/))
          .map((fileName) => fileName.replace(backupFileNameExtension, ""))
          .sort()
          .reverse(),
      )
    },
    restore: async () => {
      const backupFileName = process.argv[3]
      if (!backupFileName) throw new Error("no backupFilename")
      await restoreDatabase(backupFileName)
    },
    restoreLatest: async () => {
      const latestBackup = readdirSync(`data/backup`)
        .filter((fileName) => !fileName.match(/\.DS_Store/))
        .map((fileName) => fileName.replace(backupFileNameExtension, ""))
        .sort()
        .reverse()[0]
      await restoreDatabase(latestBackup)
    },
  } as { [key: string]: () => any }

  if (!(command in commandMap)) throw new Error("unknown command")
  await commandMap[command]()
  return
}
main()
