import { createLogger, format, transports } from "winston"
import { ElasticsearchTransport } from "winston-elasticsearch"
import { ELASTICSEARCH_HOST } from "./env"

const { combine, timestamp, colorize, printf } = format

const ES_HOST =
  process.env.NODE_ENV === "production" ? ELASTICSEARCH_HOST : "localhost"
const elasticsearchTransport = new ElasticsearchTransport({
  level: "info",
  index: "lexico",
  clientOpts: {
    node: `http://${ES_HOST}:9200`,
  },
  transformer: ({ message, level, timestamp, meta }) => ({
    message,
    level,
    timestamp,
    ...meta,
  }),
  format: timestamp(),
})

elasticsearchTransport.on("error", (error) => {
  console.error("Error caught", error)
})

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
  transports: [elasticsearchTransport, consoleTransport],
})

log.on("error", (error) => {
  console.error("Error caught", error)
})

export default log
