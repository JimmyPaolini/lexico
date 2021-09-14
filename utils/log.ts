import { Logger } from "typeorm"
import { createLogger, format, transports } from "winston"
import { LOG_SQL } from "./env"

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
  format:
    process.env.NODE_ENV === "production"
      ? format.combine(
          format.timestamp(),
          format((info) => {
            if (typeof info.message !== "object") return { ...info }
            return {
              ...info,
              ...(info.message as Record<string, unknown>),
              message: "meta",
            }
          })(),
          format.json({ replacer: circularReplacer() }),
        )
      : format.combine(
          format.timestamp(),
          format.colorize(),
          format.printf(({ timestamp, level, label, message, ...meta }) => {
            label = label ? ` [${label}]` : ""
            if (typeof message === "string") {
              if (Object.keys(meta).length)
                message += " " + JSON.stringify(meta, circularReplacer(), 2)
            } else {
              message = JSON.stringify(
                { ...(message as Record<string, unknown>), ...meta },
                circularReplacer(),
                2,
              )
            }
            return `${timestamp} ${level}${label}: ${message}`.trim()
          }),
        ),
})

const log = createLogger({
  level: "info",
  transports: [consoleTransport],
  exitOnError: false,
})

log.on("error", (error) => console.error("[logging error] ", error))

export class DatabaseLogger implements Logger {
  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: any[]): void {
    if (LOG_SQL === "true")
      log.info(`database query: ${query} ${JSON.stringify(parameters || "")}`, {
        label: "database query",
      })
  }

  /**
   * Logs query that is failed.
   */
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
  ): void {
    error = typeof error === "string" ? error : error.message
    log.error(
      `database query error: ${error}: ${query} ${JSON.stringify(
        parameters || "",
      )}`,
      {
        label: "database query error",
      },
    )
  }

  /**
   * Logs query that is slow.
   */
  logQuerySlow(time: number, query: string, parameters?: any[]): void {
    log.warn(
      `database query slow ${time}ms: ${query} ${JSON.stringify(
        parameters || "",
      )}`,
      {
        label: "database query slow",
      },
    )
  }

  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string): void {
    log.info(`database build schema: ${message}`, {
      label: "database build schema",
    })
  }

  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string): void {
    log.warn(`database migration: ${message}`, {
      label: "database migration",
    })
  }

  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log(_: "log" | "info" | "warn", message: unknown): void {
    if (log.level === "warn") log.warn(`database log: ${message}`)
    log.info(`database log: ${message}`, {
      label: "database log",
    })
  }
}

export default log
