import fs from 'fs'
import * as togeojson from '@tmcw/togeojson'
import { DOMParser } from 'xmldom'

const main = () => {
  const parser = new DOMParser()
  const kml = parser.parseFromString(fs.readFileSync('./tokyo-areas.kml', 'utf8'))
  const converted = togeojson.kml(kml)
  fs.writeFileSync('./tokyo-areas.geojson', JSON.stringify(converted))
}

main()