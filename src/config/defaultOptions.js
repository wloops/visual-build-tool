

const lineOptions = [
  {
    optionName: 'Line Chart1',
    optionID: 'line-chart1',
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  }
]
const barOptions = {}
const pieOptions = {}
const radarOptions = {}

export default {
  line: lineOptions,
  bar: barOptions,
  pie: pieOptions,
  radar: radarOptions
}
