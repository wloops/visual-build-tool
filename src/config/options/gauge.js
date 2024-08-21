import * as echarts from 'echarts'
// let option
var highlight = '#072F70'

var demoData = [
  {
    name: '仪表盘1',
    value: 30,
    unit: '%',
    pos: ['55%', '60%'],
    range: [0, 100],
    // splitNum: 9,
  }
]
const item = demoData[0]

export const gaugeOptions = [{
  // backgroundColor: '#222939',

  series: [
    // 内侧指针、数值显示
    {
      name: item.name,
      type: 'gauge',
      center: item.pos,
      radius: '83%',
      startAngle: 225,
      endAngle: -45,
      min: item.range[0],
      max: item.range[1],
      axisLine: {
        show: true,
        lineStyle: {
          width: 5,
          color: [
            [0.3, '#00CDA5'],
            [0.7, '#0085F4'],
            [1, '#FD760D'],
          ],
        },
      },
      pointer: {
        show: true,
        length: '70%',
        itemStyle: {
          color: 'auto',
        },
      },
      axisTick: {
        show: 0,
      },
      splitLine: {
        show: 0,
      },
      axisLabel: {
        show: 0,
      },
      detail: {
        show: true,
        offsetCenter: [0, '65%'],
        // textStyle: {
        fontSize: 20,
        color: 'inherit',
        // },
        // formatter: ['{value} ' + (item.unit || ''), '{name|' + item.name + '}'].join('\n'),
        rich: {
          name: {
            fontSize: 14,
            lineHeight: 25,
            color: '#ddd',
          },
        },
      },
      itemStyle: {
        // normal: {
        color: highlight,
        // },
      },
      title: { //标题
        show: true,
        offsetCenter: [0, 76], // x, y，单位px
        textStyle: {
          color: "#ddd",
          fontSize: 14, //表盘上的标题文字大小
          fontWeight: 400,
          fontFamily: 'PingFangSC'
        }
      },
      data: [
        {
          value: item.value,
          name: item.name,
        },
      ],
    },
    // 外围刻度
    {
      type: 'gauge',
      center: item.pos,
      radius: '50.33%', // 1行3个
      splitNumber: item.splitNum || 10,
      min: item.range[0],
      max: item.range[1],
      startAngle: 225,
      endAngle: -45,
      axisLine: {
        show: true,
        lineStyle: {
          width: 2,
          shadowBlur: 0,
          color: [
            [0.3, '#00CDA5'],
            [0.7, '#0085F4'],
            [1, '#FD760D'],
          ],
        },
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: highlight,
          width: 1,
        },
        length: -5,
        splitNumber: 10,
      },
      splitLine: {
        show: true,
        length: -14,
        lineStyle: {
          color: highlight,
        },
      },
      axisLabel: {
        distance: -20,
        // textStyle: {
        color: 'inherit',
        fontSize: '10',
        fontWeight: 'bold',
        // },
      },
      pointer: {
        show: 0,
      },
      detail: {
        show: 0,
      },
    },


  ],
}]
