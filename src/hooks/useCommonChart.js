import defaultOption from "@/config/defaultOptions.js";
import * as echarts from 'echarts'
export function useCommonChart() {
  let chartOptions = {}
  function getOption(type) {
    // 读取默认配置文件，根据type来选择对应的配置项
    chartOptions = type ? defaultOption[type] : {}
    return chartOptions
  }

  function init(dom, type, index) {
    // 初始化echarts实例
    let chart = echarts.init(dom)
    // 获取配置项
    let option = getOption(type)[index]
    console.log('option::', option)
    // 合并配置项
    // option = { ...option, series: [] }
    // 绘制图表
    option && chart.setOption(option)
    // 图表自适应宽度
    window.addEventListener('resize', function () {
      chart.resize()
    })
    return chart
  }

  return { chartOptions, getOption, init };
};



