import elasticsearch from "elasticsearch"
import { Logger } from "tslog"

const logger = new Logger({ displayFunctionName: false })

const es = new elasticsearch.Client({
  host: "elasticsearch:9200",
  keepAlive: true,
  maxRetries: 5,
  pingTimeout: 1000,
})

function logToELK(logObject: any) {
  es.index({ index: "lexico", type: "_doc", body: logObject }).catch(() => {
    // console.log("error logging to elasticsearch")
    // logger.debug(err)
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
