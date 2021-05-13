import { Logger } from "typeorm"
import { createLogger, format, transports } from "winston"
import { LOG_SQL } from "./env"
const { combine, timestamp, colorize, printf } = format

const circularReplacer = () => {
  const seen = new WeakSet()
  return (_: any, value: any) => {
    if (typeof value === "object" && value !== null)
      if (seen.has(value)) return
      else seen.add(value)
    return value
  }
}

const consoleTransport = new transports.Console({
  format: combine(
    timestamp(),
    colorize(),
    printf(({ timestamp, level, message, ...meta }) => {
      if (typeof message !== "string") {
        meta = message
        message = ""
      }
      const metaString = Object.keys(meta).length
        ? JSON.stringify(meta, circularReplacer(), 2)
        : ""
      return `${timestamp} ${level}: ${message} ${metaString}`.trim()
    }),
  ),
})

const log = createLogger({
  level: "info",
  transports: [consoleTransport],
})

log.on("error", (error) => console.error("[logging error] ", error))

export class DatabaseLogger implements Logger {
  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: any[]) {
    if (LOG_SQL === "true")
      log.info(`database query: ${query} ${JSON.stringify(parameters || "")}`)
  }

  /**
   * Logs query that is failed.
   */
  logQueryError(error: string | Error, query: string, parameters?: any[]) {
    error = typeof error === "string" ? error : error.message
    log.error(
      `database query error: ${error}: ${query} ${JSON.stringify(
        parameters || "",
      )}`,
    )
  }

  /**
   * Logs query that is slow.
   */
  logQuerySlow(time: number, query: string, parameters?: any[]) {
    log.warn(
      `database query slow ${time}ms: ${query} ${JSON.stringify(
        parameters || "",
      )}`,
    )
  }

  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string) {
    log.info(`database build schema: ${message}`)
  }

  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string) {
    log.warn(`database migration: ${message}`)
  }

  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log(_: "log" | "info" | "warn", message: any) {
    if (log.level === "warn") log.warn(`database log: ${message}`)
    log.info(`database log: ${message}`)
  }
}

export default log
