import { exec } from "child_process"
import { Logger } from "tslog"
import { timestampFormated } from "./string"

const log = new Logger()

export async function backupDatabase(name: string) {
  log.info("backing up database")
  const fileKey = `data/backup/${timestampFormated()}_${name}`
  const command = `pg_dump --dbname "lexico" --format "p" --compress 9 > "${fileKey}.sql.zip"`
  return await execute(command, "backed up database")
}

export async function restoreDatabase(backupName: string) {
  log.info("restoring database")
  const fileKey = `data/backup/${backupName}`
  const command = `pg_restore --clean -f "${fileKey}.sql.zip"`
  return await execute(command, "restored database")
}

async function execute(command: string, successMessage: string) {
  log.info(command)
  return await new Promise((resolve, reject) => {
    exec(command, (error) => {
      if (error) {
        log.error(error.message)
        reject(error)
      } else {
        log.info(successMessage)
        resolve(successMessage)
      }
    })
  })
}
