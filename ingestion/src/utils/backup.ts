import { exec } from "child_process"
import { DB_DATABASE, DB_USERNAME } from "../../../utils/env"
import { timestampFormated } from "../../../utils/string"

export const backupFileNameExtension = ".zip"

export async function backupDatabase(name: string) {
  log.info("backing up database")
  const fileKey = `data/backup/${timestampFormated()}_${name}`
  const command =
    `docker exec -i database pg_dump ` +
    `--dbname ${DB_DATABASE} ` +
    `--username ${DB_USERNAME} ` +
    `--format c --compress 9 ` +
    `> "${fileKey}${backupFileNameExtension}"`
  await execute(command)
  log.info("backed up database")
}

export async function restoreDatabase(backupName: string) {
  log.info("restoring database")
  const fileKey = `data/backup/${backupName}`
  const command =
    `docker exec -i database pg_restore ` +
    `--dbname ${DB_DATABASE} ` +
    `--username ${DB_USERNAME} ` +
    `--format c --clean ` +
    `< "${fileKey}${backupFileNameExtension}"`
  await execute(command)
  log.info("restore database")
}

async function execute(command: string) {
  return await new Promise((resolve, reject) => {
    exec(command, (error) => {
      if (error) {
        log.error(error.message)
        reject(error)
      } else {
        resolve(true)
      }
    })
  })
}
