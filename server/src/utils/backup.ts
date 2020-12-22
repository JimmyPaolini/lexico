import { exec } from "child_process"
import { Logger } from "tslog"

const log = new Logger()
export default function backupDatabase(name: string) {
  log.info("backing up database")
  const now = new Date().toISOString().replace(/:/g, "-")
  const fileKey = `data/backup/${now}-${name}.sql`
  exec(
    `mysqldump ` +
      // `--bind-address ${process.env.DB_HOST} ` +
      // `-P ${process.env.DB_PORT} ` +
      // `-u ${process.env.DB_USERNAME} ` +
      // `-p ${process.env.DB_PASSWORD} ` +
      `lexico > ${fileKey}`,
  )
  log.info("backed up database:", fileKey)
}
