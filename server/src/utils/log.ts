import elasticsearch from "elasticsearch"
import { Logger } from "tslog"

const logger = new Logger({ displayFunctionName: false })

const es = new elasticsearch.Client({
  host: "localhost:9200",
  keepAlive: true,
})

function logToELK(logObject: any) {
  es.index({ index: "lexico", type: "_doc", body: logObject })
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
