import { exec } from "child_process"
import { Logger } from "tslog"

const log = new Logger()
export default function backupDatabase() {
  log.info("backing up database")
  const now = new Date().toISOString().replace(/:/g, "-")
  exec(
    `mysqldump ` +
      // `--bind-address ${process.env.DB_HOST} ` +
      // `-P ${process.env.DB_PORT} ` +
      // `-u ${process.env.DB_USERNAME} ` +
      // `-p ${process.env.DB_PASSWORD} ` +
      `lexico > data/backup/${now}.sql`,
  )
  log.info("backed up database", `data/backup/${now}.sql`)
}
