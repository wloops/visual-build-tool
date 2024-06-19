<script setup>
const props = defineProps({
  layoutData: {
    type: Object,
    default: () => { }
  }
})
import { useCommonChart } from '@/hooks/useCommonChart'
import { nextTick } from 'vue';
// const { chartOptions, getOption, init } = useCommonChart()
// onMounted(() => {
//   const dom = document.getElementById(props.layoutData.id)
//   console.log('onMounted', props.layoutData)
//   if (!dom) return
//   console.log('black dom %:', dom)
//   setTimeout(() => {

//     nextTick(() => {
//       const chart = init(dom, 'line')
//       console.log('chart:', chart)
//     })
//   }, 1000);
// })
</script>

<template>
  <div w-full h-full>
    <div w-full h-full :id="props.layoutData.id"></div>
  </div>
</template>


<style scoped></style>
