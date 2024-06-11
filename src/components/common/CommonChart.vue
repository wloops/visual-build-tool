<script setup>
const props = defineProps({
  layoutData: {
    type: Object,
    default: () => { }
  }
})
import { useCommonChart } from '@/hooks/useCommonChart'
import { nextTick } from 'vue';
const { chartOptions, getOption, init } = useCommonChart()
onMounted(() => {
  console.log('onMounted', props.layoutData)
  const dom = document.getElementById(props.layoutData.id)
  nextTick(() => {
    console.log('nextTick', dom)
    init(dom, 'line')
  })
  // console.log('dom#', dom)
  // init(dom, 'line')
})
</script>

<template>
  <div>
    <div w-30 h-30 :id="props.layoutData.id"></div>
  </div>
</template>


<style scoped></style>
