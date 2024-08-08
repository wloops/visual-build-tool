import { lineOptions } from './options/line'
import { pieOptions } from './options/pie'
import { scatterOptions } from './options/scatter'
import { graphOption } from './options/graph'


const barOptions = []
const radarOptions = []

export default {
  line: lineOptions,
  bar: barOptions,
  pie: pieOptions,
  radar: radarOptions,
  scatter: scatterOptions,
  graph: graphOption
}
