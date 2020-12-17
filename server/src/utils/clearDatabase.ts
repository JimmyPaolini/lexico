import { Logger } from "tslog"
import { getConnection } from "typeorm"

const log = new Logger()

export default async function clearDatabase(_: any, res: any) {
  try {
    log.info("Clearing database")
    await getConnection().query(`DELETE FROM translation`)
    await getConnection().query(`DELETE FROM word`)
    res.status(200).send()
  } catch (e) {
    res.status(500).send(e.toString())
  }
}
