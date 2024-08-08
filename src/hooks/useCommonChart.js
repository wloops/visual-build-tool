import defaultOption from "@/config/defaultOptions"; // 默认option
import * as echarts from 'echarts'
// lodash-es 深拷贝
import { cloneDeep } from 'lodash-es'

export function useCommonChart() {
  let chartOption = {}
  function getOptions(type) {
    const chartOptions = defaultOption[type]
    console.log('chartOptions::', chartOptions)
    return chartOptions
  }
  function getOption(type, chartID, myOption) {
    // 读取默认配置文件，根据type来选择对应的配置项
    const chartOptions = myOption ? myOption : defaultOption[type]
    // 深拷贝配置项
    const newOption = cloneDeep(chartOptions)
    if (!chartID) {
      chartOption = newOption[0]
      return { chartOptions, chartOption }
    }
    // 根据chartID读取数据
    newOption.forEach(option => {
      if (option.chartID === chartID) {
        chartOption = option
      }
    })

    return { chartOptions, chartOption }
  }

  async function init(dom, type, chartID, myOption) {
    // getLayerBgs()

    // 初始化echarts实例
    const chart = echarts.init(dom)
    // 获取配置项
    const { chartOption: option } = await getOption(type, chartID, myOption)
    // console.log('data类型::', typeof data)
    // if (data) {
    //   const { value, label } = data
    //   option.series[0].data = value
    //   option.xAxis[0].data = label
    // }
    // console.log('option new data::', data)
    console.log('option new::', option)
    // 合并配置项
    // option = { ...option, series: [] }
    // 绘制图表
    console.log('chart::', chart)
    option && chart.setOption(option, true)
    // 图表自适应宽度
    window.addEventListener('resize', function () {
      chart.resize()
    })
    // return chart
  }

  return { chartOption, getOption, getOptions, init };
};




