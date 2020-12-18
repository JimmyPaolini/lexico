import VerbForms from "../entity/word/forms/VerbForms"

export default async function script() {
  const verbForms = new VerbForms()
  console.log(VerbForms.prototype)
  console.log(JSON.stringify(verbForms, null, 2))
}
