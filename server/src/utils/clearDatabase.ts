import { getConnection } from "typeorm"
import Translation from "../entity/Translation"
import Word from "../entity/Word"

export default async function clearDatabase(_: any, res: any) {
  try {
    await getConnection()
      .getRepository(Translation)
      .query(`DELETE FROM translation`)
    await getConnection().getRepository(Word).query(`DELETE FROM word`)
    res.status(200).send()
  } catch (e) {
    res.status(500).send(e)
  }
}
