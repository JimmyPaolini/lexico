import { createConnection } from "typeorm"
import log from "./log"
import ormconfig from "./ormconfig"

export async function connectDatabase() {
  await createConnection(ormconfig)
  log.info("connected to database")
}
