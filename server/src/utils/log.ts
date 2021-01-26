import elasticsearch from "elasticsearch"
import { Logger } from "tslog"

const logger = new Logger({ displayFunctionName: false })

const es = new elasticsearch.Client({
  host: "localhost:9200",
  keepAlive: true,
})
const index = "lexico"
const type = "_doc"

function logToELK(logObject: any) {
  es.index({ index, type, body: logObject }).catch((err) => logger.error(err))
}

logger.attachTransport(
  {
    silly: logToELK,
    debug: logToELK,
    trace: logToELK,
    info: logToELK,
    warn: logToELK,
    error: logToELK,
    fatal: logToELK,
  },
  "silly",
)

export default logger
