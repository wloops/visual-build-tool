<script setup>
import { useThemeVars } from 'naive-ui'
import { useCommonChart } from '@/hooks/useCommonChart'
// import { useProceResponseData } from '@/hooks/useProceResponseData'
const { chartOptions, getOption, init } = useCommonChart()
const props = defineProps(['config', 'data'])

onMounted(() => {
  initChart()
})

watch(
  () => props.data,
  () => {
    initChart()
  }
)

let confirm_data = ref([
  {
    id: 1,
    name: '电子签章服务器0086',
    ip: '192.168.1.0.1',
    port: '80',
    runTime: '132.5个小时',
    cpuUsage: 28,
    memoryUsage: 56,
    // diskUsage: '80%',
    networkUsage: 86,
    chartData: {
      label: '设备风险值',
      value: 96
    }
  }
])

watch(
  () => props.data,
  newVal => {
    if (newVal) {
      confirm_data.value = newVal
    }
  }
)

const themeVars = useThemeVars()

const progressColor = percent => {
  if (percent < 50) {
    return themeVars.value.successColor
  } else if (percent > 50 && percent < 80) {
    return themeVars.value.warningColor
  } else {
    return themeVars.value.errorColor
  }
}

const initChart = () => {
  let resultData = null
  // if (!Array.isArray(confirm_data.value)) {
  resultData = confirm_data.value
  // }
  if (resultData) {
    resultData.forEach((data, index) => {
      const domId = 'child-left-' + props.config.id + '-' + index
      const dom = document.getElementById(domId)
      if (!dom) return
      // console.log('dom %:', dom, props.data)
      // if (props.config.request && props.data.length > 0) {
      //   resultData = useProceResponseData(props.config.request?.params.wsId, props.data)
      // }
      console.log('resultData data:', dom, resultData[index].chartData)
      nextTick(() => {
        const type = 'gauge'
        init(
          dom,
          type,
          props.config.chartID ? props.config.chartID : '',
          resultData[index].chartData
        )
      })
    })
  }
}
</script>

<template>
  <div w-full h-full flex justify-center flex-col>
    <div
      class="derviceBox1 flex-1"
      v-for="(data, index) in confirm_data"
      :key="data.id"
    >
      <div
        class="chart"
        :id="'child-left-' + config.id + '-' + index"
        style="width: 50%; height: 100%; margin-right: 10%"
        ref="derviceChart"
      ></div>
      <div class="dervice-info-box">
        <div class="dervice-info-title">{{ data.name }}</div>
        <div class="dervice-info-content">
          <div class="dervice-info-item">
            <div class="dervice-info-item-title">IP地址：</div>
            <div class="dervice-info-item-content">{{ data.ip }}</div>
          </div>
          <div class="dervice-info-item">
            <div class="dervice-info-item-title">端口：</div>
            <div class="dervice-info-item-content">{{ data.port }}</div>
          </div>
          <div class="dervice-info-item">
            <div class="dervice-info-item-title">运行时长：</div>
            <div class="dervice-info-item-content">{{ data.runTime }}</div>
          </div>
          <div class="dervice-info-item">
            <div class="dervice-info-item-title">CPU利用率：</div>
            <div class="dervice-info-item-content">
              <n-progress
                type="line"
                :color="progressColor(data.cpuUsage)"
                :rail-color="themeVars.primaryColor"
                :percentage="data.cpuUsage"
                indicator-text-color="#ffffffc7"
                processing
              />
            </div>
          </div>
          <div class="dervice-info-item">
            <div class="dervice-info-item-title">内存利用率：</div>
            <div class="dervice-info-item-content">
              <n-progress
                type="line"
                :color="progressColor(data.memoryUsage)"
                :rail-color="themeVars.primaryColor"
                :percentage="data.memoryUsage"
                indicator-text-color="#ffffffc7"
                processing
              />
            </div>
          </div>
          <div class="dervice-info-item">
            <div class="dervice-info-item-title">
              网络负载：&nbsp;&nbsp;&nbsp;
            </div>
            <div class="dervice-info-item-content">
              <n-progress
                type="line"
                :color="progressColor(data.networkUsage)"
                :rail-color="themeVars.primaryColor"
                :percentage="data.networkUsage"
                indicator-text-color="#ffffffc7"
                processing
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.derviceBox1 {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .chart {
    flex: 1;
    /* width: 50%; */
    height: 100%;
    /* margin-right: 10%; */
  }

  .dervice-info-box {
    flex: 1;
    /* width: 50%; */
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    color: #ffffffc7;
    margin-top: 25px;
    margin-right: 10px;

    .dervice-info-title {
      color: #04b7e4;
      font-weight: 600;
      width: 100%;
      text-align: left;
    }

    .dervice-info-content {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 10px;
      margin-top: 10px;

      .dervice-info-item {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;

        .dervice-info-item-title {
          font-size: 10px;
          font-weight: 500;
          color: #869ba0;
          margin-right: 10px;
          text-align: left;
        }

        .dervice-info-item-content {
          flex: 2;
          font-size: 10.5px;
          font-weight: 500;
          color: #ffffffc7;
          /* text-align: right; */
        }
      }
    }
  }
}
</style>
