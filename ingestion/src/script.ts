import fs from "fs-extra"

async function main() {
  for (let i = 1; i <= 14; i++) {
    fs.ensureFileSync(`../data/literature/philippicae/book ${i}.txt`)
  }
}
main()
