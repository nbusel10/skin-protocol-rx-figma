import fs from 'node:fs'

const html = fs.readFileSync(
  'C:/WebProjects/SkinProtocolRX/public/designs/working/quiet-geometry-reference.html',
  'utf8',
)

const rules = [
  'motif-hero',
  'motif-philosophy',
  'motif-protocol',
  'motif-education',
  'motif-quiz',
  'motif-founders',
  'motif-spa',
  'motif-partners',
  'geometry-stage',
  'image-layout-partners',
  'sketch',
  'wide-sketch',
  'draw',
]

for (const name of rules) {
  const re = new RegExp(`\\.${name}[^{]*\\{[^}]+\\}`, 'g')
  const matches = html.match(re) || []
  console.log('\n##', name)
  matches.forEach(m => console.log(m))
}

// partners stage HTML snippet
const p = html.indexOf('motif-partners')
console.log('\n## partners context\n', html.slice(p - 100, p + 500))
const s = html.indexOf('motif-spa')
console.log('\n## spa context\n', html.slice(s - 100, s + 500))
