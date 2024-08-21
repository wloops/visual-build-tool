import { lineOptions } from './options/line'
import { pieOptions } from './options/pie'
import { scatterOptions } from './options/scatter'
import { graphOption } from './options/graph'
import { gaugeOptions } from './options/gauge'


const barOptions = []
const radarOptions = []

export default {
  line: lineOptions,
  bar: barOptions,
  pie: pieOptions,
  radar: radarOptions,
  scatter: scatterOptions,
  graph: graphOption,
  gauge: gaugeOptions
}
