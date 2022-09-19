import fs from 'fs'
import * as togeojson from '@tmcw/togeojson'
import { DOMParser } from 'xmldom'

export const convertToGeoJSON = (kmlInputPath, jsonOutputPath) => {
  const parser = new DOMParser()
  const kml = parser.parseFromString(fs.readFileSync(kmlInputPath, 'utf8'))
  const converted = togeojson.kml(kml)
  fs.writeFileSync(jsonOutputPath, JSON.stringify(converted))
  return
}

const main = () => {
  convertToGeoJSON('./tokyo-areas.kml', './tokyo-areas.geojson')
}

main()