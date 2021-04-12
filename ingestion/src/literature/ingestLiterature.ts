import fs from "fs-extra"
import { clearLiterature } from "../utils/clear"
import ingestAuthor from "./ingestAuthor"

export default async function ingestLiterature() {
  await clearLiterature()
  const authors = fs.readdirSync("../data/literature")
  for (const nickname of authors) {
    await ingestAuthor(nickname)
  }
}

/* Latin Literature

Early
Livius Andronicus - translated Odyssey
Gnaeus Naevius - epic poem about First Punic War
Quintus Ennius - wrote Annals, about Roman history. Adopted Greek dactylic hexameter
Marcus Pacuvius, Lucius Accius (Fragments)
Plautus - wrote 20 comedies
Terence - wrote 6 comedies
Cato - wrote On Agriculture
Gaius Lucilius - poetry in Satires, easy conversational tone

Golden Age
DONE: Virgil, Caesar, Augustus, Ovid, Cicero, Catullus
Sallust - historical writer
Lucretius - De Rerum Natura about epicurean philosophy
Marcus Terentius Varro - various subjects, some fragments some whole
Horace - Epodes, Odes (very notable), Satires, Epistles
Tibullus, Propertius - elegy, contemporary to Ovid
Livy - prose history of Rome

Imperial Period
Seneca - stoic philosopher
Lucan - poet, wrote Pharsalia about Caesar/Pompey civil war
Petronius - Satyricon, first picaresque Latin novel (only fragments)
Gaius Valerius Flaccus - Argonautica, about Jason/Golden Fleece
Statius - Thebaid, about Oedipus
Silius Italicus - Punica, about Second Punic War (Hannibal)
Martial - epigram writer
Juvenal - satire writer
Tacitus - historian, wrote Histories and Annals
Suetonius - biographer of Roman rulers Caesar through Domitian
Pliny Minor - letters about Roman life
Aulus Gellius - wrote Attic Nights, anecddotes an literary discussions among friends
Marcus Cornelius Fronto - orator who wrote letters to Marcus Aurelius
Apuuleius - wrote his Metamorphoses (The Golden Ass), about a young man who's turned into a donkey

Middle Ages, Neo Latin
Ammianus Marcellinus - wrote history
Quintus Aurelius Symmachus - orator
Ausonius - poet, wrote Mosella which has a modern feeling to it
Rutilius Claudius Namatianus - poet
Descartes
Francis Bacon
Baruch Spinoza
Swedenborg
Linnaeus
Euler
Gauss
Newton
Milton
Thomas Campion
George Herbert
Andrew Marvell
Anthony Alsopp, Vincent Bourne - noted for pure Classical style
Raphael Landivar - Rusticatio Mexicana

Christian
Augustine of Hippo
Jerome
Ambrose
Prudentius - first great Christian poet

*/
