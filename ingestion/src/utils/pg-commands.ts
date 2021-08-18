import { exec } from "child_process"
import { readdirSync } from "fs"
import {
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} from "../../../utils/env"
import log from "../../../utils/log"
import {
  clearAll,
  clearDictionary,
  clearIngested,
  clearLiterature,
  clearUsers,
} from "./clear"

export const backupFileNameExtension = ".zip"

export const backups = (filter?: RegExp): string[] =>
  readdirSync(`../data/backup`)
    .filter((fileName) => !fileName.match(/\.DS_Store/))
    .filter((fileName) => fileName.match(filter || /[\s\S]*/))
    .map((fileName) => fileName.replace(backupFileNameExtension, ""))
    .sort()
    .reverse()

const dictionaryTables = ["entry", "word", "translation", "word_entries_entry"]

const literatureTables = ["author", "book", "text", "line"]

const userTables = ["user", "user_bookmarks_entry", "user_readings_line"]

const createCommand = (isBackup: boolean, fileKey: string, tables: string[]) =>
  `PGPASSWORD=${POSTGRES_PASSWORD} ` +
  `${isBackup ? "pg_dump --compress 9" : "pg_restore"} ` +
  `--dbname ${POSTGRES_DB} ` +
  tables.map((table) => `-t ${table} `).join("") +
  `--username ${POSTGRES_USER} ` +
  `--host ${
    process.env.NODE_ENV === "production" ? "database" : "localhost"
  } ` +
  `--port 5432 --format c --data-only ` +
  `${isBackup ? ">" : "<"} "${fileKey}${backupFileNameExtension}"`

export async function backupDatabase(
  type: string,
  tables: string[],
): Promise<void> {
  log.info(`backing up ${type}`)
  const fileKey = `../data/backup/${new Date().toISOString()}_${type}`
  const command = createCommand(true, fileKey, tables)
  await execute(command)
  log.info(`backed up ${type}`)
}

export async function backupDictionary(): Promise<void> {
  await backupDatabase("dictionary", dictionaryTables)
}

export async function backupLiterature(): Promise<void> {
  await backupDatabase("literature", literatureTables)
}

export async function backupUsers(): Promise<void> {
  await backupDatabase("users", userTables)
}

export async function backupIngested(): Promise<void> {
  await backupDatabase("ingested", [...dictionaryTables, ...literatureTables])
}

export async function backupAll(): Promise<void> {
  await backupDatabase("all", [
    ...dictionaryTables,
    ...literatureTables,
    ...userTables,
  ])
}

export async function restoreDatabase(
  backupName: string,
  type: string,
  tables: string[],
): Promise<void> {
  log.info(`restoring ${type}`)
  const fileKey = `../data/backup/${backupName}`
  const command = createCommand(false, fileKey, tables)
  await execute(command)
  log.info(`restored ${type}`)
}

export async function restoreDictionary(backupName: string): Promise<void> {
  await clearDictionary()
  await restoreDatabase(backupName, "dictionary", dictionaryTables)
}

export async function restoreLiterature(backupName: string): Promise<void> {
  await clearLiterature()
  await restoreDatabase(backupName, "literature", literatureTables)
}

export async function restoreUsers(backupName: string): Promise<void> {
  await clearUsers()
  await restoreDatabase(backupName, "users", userTables)
}

export async function restoreIngested(backupName: string): Promise<void> {
  await clearIngested()
  await restoreDatabase(backupName, "ingested", [
    ...dictionaryTables,
    ...literatureTables,
  ])
}

export async function restoreAll(backupName: string): Promise<void> {
  await clearAll()
  await restoreDatabase(backupName, "all", [
    ...dictionaryTables,
    ...literatureTables,
    ...userTables,
  ])
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
