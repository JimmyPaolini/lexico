import { exec } from "child_process"
import {
  POSTGRES_DB,
  DATABASE_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} from "../../../utils/env"
import log from "../../../utils/log"
import { timestampFormated } from "../../../utils/string"

export const backupFileNameExtension = ".zip"

export async function backupDatabase(name: string) {
  log.info("backing up database")
  const fileKey = `data/backup/${timestampFormated()}_${name}`
  const command =
    `PGPASSWORD=${POSTGRES_PASSWORD} ` +
    `pg_dump ` +
    `--dbname ${POSTGRES_DB} ` +
    `--username ${POSTGRES_USER} ` +
    `--host ${DATABASE_HOST} ` +
    `--port 5432 ` +
    `--format c --compress 9 ` +
    `> "${fileKey}${backupFileNameExtension}"`
  await execute(command)
  log.info("backed up database")
}

export async function restoreDatabase(backupName: string) {
  log.info("restoring database")
  const fileKey = `data/backup/${backupName}`
  const command =
    `PGPASSWORD=${POSTGRES_PASSWORD} ` +
    `pg_restore ` +
    `--dbname ${POSTGRES_DB} ` +
    `--username ${POSTGRES_USER} ` +
    `--host ${DATABASE_HOST} ` +
    `--port 5432 ` +
    `--format c --clean ` +
    `< "${fileKey}${backupFileNameExtension}"`
  await execute(command)
  log.info("restored database")
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
