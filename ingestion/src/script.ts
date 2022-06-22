import omnis from '../../data/dictionary/omnis.json'
import Entry from '../../entity/dictionary/Entry'
import { connectDatabase } from '../../utils/database'
import { createManual, deleteManual } from './dictionary/ingestManual'

async function main() {
  await connectDatabase()
  await deleteManual('omnis:0')
  await createManual(omnis as Entry)
}
main()
