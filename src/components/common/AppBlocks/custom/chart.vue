<script setup>
import { useCommonChart } from '@/hooks/useCommonChart'
// import { useProceResponseData } from '@/hooks/useProceResponseData'
const { chartOptions, getOption, init } = useCommonChart()
const props = defineProps(['config', 'data'])
console.log('props chart%:', props.data)

onMounted(() => {
  initChart()
})

watch(() => props.data, () => {
  initChart()
})

const initChart = () => {
  const dom = document.getElementById('chart-' + props.config.id)
  if (!dom) return
  console.log('dom %:', dom, props.data)
  let resultData = null
  if (!Array.isArray(props.data)) {
    resultData = props.data
  }
  // if (props.config.request && props.data.length > 0) {
  //   resultData = useProceResponseData(props.config.request?.params.wsId, props.data)
  // }
  nextTick(() => {
    const type = props.config.type.split('|')[1]
    init(dom, type, props.config.chartID ? props.config.chartID : '', resultData)
  })
}
</script>

<template>
  <div :id="'chart-' + props.config.id" w-full h-full>
  </div>
</template>


<style scoped></style>
