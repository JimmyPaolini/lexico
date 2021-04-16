import { createLogger, format, transports } from "winston"

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
      const metaString = Object.keys(meta).length
        ? " " + JSON.stringify(meta, circularReplacer(), 2)
        : ""
      return `${timestamp} ${level}: ${message}${metaString}`
    }),
  ),
})

const log = createLogger({
  level: "info",
  transports: [consoleTransport],
})

log.on("error", (error) => console.error("[logging error] ", error))

export default log
