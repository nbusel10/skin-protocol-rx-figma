import fs from 'node:fs'

const src =
  'C:/Users/nnels/Downloads/Skin_Protocol_RX_Quiet_Geometry_Inverted_Double_Arches (1).html'
const html = fs.readFileSync(src, 'utf8')
fs.mkdirSync('C:/WebProjects/SkinProtocolRX/public/designs/working', { recursive: true })
fs.copyFileSync(src, 'C:/WebProjects/SkinProtocolRX/public/designs/working/quiet-geometry-reference.html')

const motifNames = ['hero', 'philosophy', 'protocol', 'education', 'quiz', 'founders', 'spa', 'partners']
const out = {}

for (const name of motifNames) {
  const classNeedle = `motif-${name}`
  let searchFrom = 0
  while (true) {
    const idx = html.indexOf(classNeedle, searchFrom)
    if (idx === -1) break
    const svgStart = html.indexOf('<svg', idx)
    if (svgStart === -1 || svgStart - idx > 400) {
      searchFrom = idx + classNeedle.length
      continue
    }
    const svgEnd = html.indexOf('</svg>', svgStart)
    if (svgEnd === -1) break
    const svg = html.slice(svgStart, svgEnd + 6)
    // Prefer the stage motif (larger / draw class), not tiny gallery thumbs
    if (!out[name] || svg.length > out[name].length || svg.includes('draw')) {
      out[name] = svg
    }
    searchFrom = svgEnd + 6
  }
}

const dir = 'C:/WebProjects/SkinProtocolRX/scripts/quiet-geometry-extract'
fs.mkdirSync(dir, { recursive: true })
for (const [name, svg] of Object.entries(out)) {
  fs.writeFileSync(`${dir}/${name}.svg`, svg)
  console.log(name, svg.length, svg.includes('class="draw"') || svg.includes("class='draw'") || svg.includes(' draw'))
}

// Also dump CSS custom props / stroke vars from :root
const rootMatch = html.match(/:root\{[^}]+\}/)
fs.writeFileSync(`${dir}/root.css`, rootMatch ? rootMatch[0] : 'none')
console.log('root', rootMatch?.[0]?.slice(0, 300))

// Dump draw JS
const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
scriptMatches.forEach((m, i) => {
  fs.writeFileSync(`${dir}/script-${i}.js`, m[1])
  console.log('script', i, m[1].length)
})
