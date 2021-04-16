import { createLogger, format, transports } from "winston"

const { combine, timestamp, colorize, printf } = format

// const client = new Client({
//   node: `http://${
//     process.env.NODE_ENV === "production" ? "elasticsearch" : "localhost"
//   }:9200`,
// })
// const elasticsearchTransport = new ElasticsearchTransport({
//   level: "info",
//   index: "lexico",
//   client,
//   transformer: ({ message, level, timestamp, meta }) => ({
//     message,
//     level,
//     timestamp,
//     ...meta,
//   }),
//   format: timestamp(),
// })

const consoleTransport = new transports.Console({
  format: combine(
    timestamp(),
    colorize(),
    printf(({ timestamp, level, message, ...meta }) => {
      const metaString = Object.keys(meta).length
        ? "\n" + JSON.stringify(meta, circularReplacer(), 2)
        : ""
      return `${timestamp} ${level}: ${message}${metaString}`
    }),
  ),
})

const circularReplacer = () => {
  const seen = new WeakSet()
  return (_: any, value: any) => {
    if (typeof value === "object" && value !== null)
      if (seen.has(value)) return
      else seen.add(value)
    return value
  }
}

const log = createLogger({
  level: "info",
  transports: [
    consoleTransport,
    // elasticsearchTransport,
  ],
})

log.on("error", (error) => {
  if (error.message.match(/elasticsearch/i))
    console.error("Error caught", error.name, error.message)
  else console.error("Error caught", error)
})

export default log
