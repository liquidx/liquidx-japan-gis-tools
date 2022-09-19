import fs from 'fs'
import { program } from 'commander'

export const summarizeFeature = (feature) => {
  const { type, properties, geometry } = feature

  let output = []

  output.push(`Geometry: ${geometry.type}, coordinates: ${geometry.coordinates.length}`)
  output.push(`Properties: ${properties.PREF_NAME} ${properties.CITY_NAME} ${properties.S_NAME}`)
  return output
}

export const inspectGeoJSON = (jsonInputPath, index, search) => {
  const geo = JSON.parse(fs.readFileSync(jsonInputPath, 'utf8'))
  const featureCount = geo.features.length


  let features = []
  if (index >= 0) {
    features = [geo.features[index]]
  } else if (search) {
    features = geo.features.filter((feature) => {
      return (feature.properties.CITY_NAME.match(search) || feature.properties.S_NAME.match(search))
    })
  }

  let output = []
  output.push(`There are ${featureCount} features in this GeoJSON file.`)

  features.forEach((feature) => {
    output = output.concat(summarizeFeature(feature))
  })

  console.log(output.join('\n'))
  return
}

const main = () => {
  program
    .option('-n, --index <number>', 'index of feature to inspect', -1)
    .option('-s, --search <term>', 'search term')
    .option('-i, --input <filename>');

  program.parse();
  const options = program.opts();

  inspectGeoJSON(options.input, parseInt(options.index), options.search)
}

main()