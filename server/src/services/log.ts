import { Logger } from 'typeorm'
import { createLogger, format, transports } from 'winston'

export const circularReplacer: () =>
  | ((this: unknown, key: string, value: unknown) => unknown)
  | undefined = () => {
  const seen = new WeakSet()
  return (_: unknown, value: unknown) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return
      else seen.add(value)
    }
    return value
  }
}

const consoleTransport = new transports.Console({
  format:
    process.env.NODE_ENV === 'production'
      ? format.combine(
          format.timestamp(),
          format((info) => {
            if (typeof info.message !== 'object') return { ...info }
            return {
              ...info,
              ...(info.message as Record<string, unknown>),
              message: 'meta',
            }
          })(),
          format.json({ replacer: circularReplacer() })
        )
      : format.combine(
          format.timestamp(),
          format.colorize(),
          format.printf(({ timestamp, level, label, message, ...meta }) => {
            label = label ? ` [${label}]` : ''
            if (typeof message === 'string') {
              if (Object.keys(meta).length) {
                message += ' ' + JSON.stringify(meta, circularReplacer(), 2)
              }
            } else {
              message = JSON.stringify(
                { ...(message as Record<string, unknown>), ...meta },
                circularReplacer(),
                2
              )
            }
            return `${timestamp} ${level}${label}: ${message}`.trim()
          })
        ),
})

const log = createLogger({
  level: 'info',
  transports: [consoleTransport],
  exitOnError: false,
})

log.on('error', (error) => console.error('[logging error] ', error))

export class DatabaseLogger implements Logger {
  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: unknown[]): void {
    if (process.env.LOG_SQL === 'true') {
      log.info(`${query} ${JSON.stringify(parameters ?? '')}`, {
        label: 'database query',
      })
    }
  }

  /**
   * Logs query that is failed.
   */
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: unknown[]
  ): void {
    error = typeof error === 'string' ? error : error.message
    log.error(`${error}: ${query} ${JSON.stringify(parameters ?? '')}`, {
      label: 'database query error',
    })
  }

  /**
   * Logs query that is slow.
   */
  logQuerySlow(time: number, query: string, parameters?: unknown[]): void {
    log.warn(`${time}ms: ${query} ${JSON.stringify(parameters ?? '')}`, {
      label: 'database query slow',
    })
  }

  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string): void {
    log.info(`${message}`, { label: 'database build schema' })
  }

  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string): void {
    log.warn(`${message}`, { label: 'database migration' })
  }

  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log(_: 'log' | 'info' | 'warn', message: unknown): void {
    if (log.level === 'warn') log.warn(`database log: ${message}`)
    log.info(`${message}`, { label: 'database log' })
  }
}

export default log

type Params = {
  logRuntime?: boolean
  logParams?: boolean
  mapParams?: (params: any) => unknown
  logResult?: boolean
  mapResult?: (result: any) => unknown
}

/**
 * Decorator to log a functions runtime, parameters, and results.
 */
export function Log(params?: Params) {
  const logRuntime = params?.logRuntime ?? true
  const logParams = params?.logParams ?? true
  const logResult = params?.logResult ?? true
  const mapParams = params?.mapParams ?? ((params) => params)
  const mapResult = params?.mapResult ?? ((result) => result)
  return function Log(
    _target: unknown,
    functionName: string,
    propertyDescriptor: PropertyDescriptor
  ): void {
    const decoratedFunction = propertyDescriptor.value
    propertyDescriptor.value = async function (...params: unknown[]) {
      const start = process.hrtime()
      const result = await decoratedFunction.apply(this, params)
      const runtime = process.hrtime(start)[1] / 1000000 // in milliseconds
      log.info(functionName, {
        runtime: logRuntime ? runtime : undefined,
        params: logParams ? mapParams?.(params) ?? params : undefined,
        result: logResult ? mapResult?.(result) ?? result : undefined,
      })
      return result
    }
  }
}
