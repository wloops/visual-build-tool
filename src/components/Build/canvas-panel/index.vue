<script setup>
import CanvasMain from './components/CanvasMain.vue';
import { useMaterialStore } from '@/stores/material'

const materialStore = useMaterialStore()
const props = defineProps({
  canvasLayoutData: {
    type: Object,
    default: () => { },
  },
})

console.log('canvasLayoutData:', props.canvasLayoutData)
const materialList = ref([
  {
    name: 'Beijing Toutiao Technology Co., Ltd.',
    key: '1',
  }
])

const layoutModel = ref(materialStore.materialLayout)
</script>

<template>
  <div id="canvas-panel-index" style="height: 80vh;" w-full flex justify-center items-center>
    <!-- <a-card :style="{ width: '100%', height: '85vh', margin: '15px', paddingTop: '0' }" title="" hoverable
      :bordered="false"> -->
    <CanvasMain :layout-model="layoutModel" :canvasLayoutData="canvasLayoutData.list" w-full h-full />

    <!-- </a-card> -->
  </div>
</template>


<style scoped></style>
