import fs from "fs-extra"

const oratoria = `Pro Quinctio	Pro Roscio Amerino	Pro Roscio Comodeo
de Lege Agraria Contra Rullum	In Verrem	de Imperio Gnaeus Pompei
Pro Caecina	Pro Cluentio	Pro Rabirio Perduellionis Reo
In Catilinam I-IV	Pro Murena	Pro Sulla
Pro Flacco	Pro Archia	Post Reditum in Senatu
Post Reditum in Quirites	de Domo Sua	de Haruspicum Responsis
Pro Gnaeus Plancio	Pro Sestio	In Vatinium
Pro Caelio	de Provinciis Consularibus	Pro Balbo
Pro Milone	In Pisonem	Pro Scauro
Pro Fonteio	Pro Rabirio Postumo	Pro Marcello
Pro Ligario	Pro Deiotaro	Philippics`
  .toLowerCase()
  .split(/\t|\n/)

for (const name of oratoria)
  fs.ensureFileSync(`../data/literature/cicero/oratoria/${name}.txt`)

const philosophia = `de Inventione	de Optimo Genere Oratorum	Topica
  de Oratore	de Fato	Paradoxa Stoicorum
  De Partitione Oratoria	Brutus	Orator
  De Re Publica	de Consulatu Suo	de Legibus
  de Finibus	Tusculanae Disputationes	de Natura Deorum
  Academica	Cato Maior de Senectute	Laelius de Amicitia
  de Divinatione	de Officiis	Commentariolum Petitionis`
  .toLowerCase()
  .split(/\t|\n/)

for (const name of philosophia)
  fs.ensureFileSync(`../data/literature/cicero/philosophia/${name.trim()}.txt`)

const epistulae = `ad Atticum	ad Familiares	ad Quintum	ad Brutum`
  .toLowerCase()
  .split(/\t|\n/)

for (const name of epistulae)
  fs.ensureFileSync(`../data/literature/cicero/epistulae/${name.trim()}.txt`)
