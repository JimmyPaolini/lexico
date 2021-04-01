import fs from "fs-extra"

for (let i = 1; i < 25; i++) {
  fs.ensureFileSync(`data/literature/catullus/1-24/book ${i}.txt`)
  fs.ensureFileSync(`data/literature/catullus/25-48/book ${i + 24}.txt`)
  fs.ensureFileSync(`data/literature/catullus/49-72/book ${i + 48}.txt`)
  fs.ensureFileSync(`data/literature/catullus/73-96/book ${i + 72}.txt`)
  fs.ensureFileSync(`data/literature/catullus/97-116/book ${i + 96}.txt`)
}
