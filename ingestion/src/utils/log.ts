import elasticsearch from "elasticsearch"
import { Logger } from "tslog"

const logger = new Logger({
  name: "ingestion",
  displayFunctionName: false,
  minLevel: "info",
})

const es = new elasticsearch.Client({
  host: "localhost:9200",
  keepAlive: true,
})

function logToELK(logObject: any) {
  es.index({ index: "lexico", type: "_doc", body: logObject }).catch((err) => {
    console.log("error logging to elasticsearch")
    logger.debug(err)
  })
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
