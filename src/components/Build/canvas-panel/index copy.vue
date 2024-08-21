<script setup>
import CanvasMain from './components/CanvasMain.vue';
const props = defineProps({
  canvasLayoutData: {
    type: Object,
    default: () => { },
  },
})


const materialList = ref([
  {
    name: 'Beijing Toutiao Technology Co., Ltd.',
    key: '1',
  }
])
</script>

<template>
  <div id="canvas-panel" style="height: 80vh;" w-full flex justify-center items-center>
    <!-- <a-card :style="{ width: '100%', height: '85vh', margin: '15px', paddingTop: '0' }" title="" hoverable
      :bordered="false"> -->
    <CanvasMain :canvasLayoutData="canvasLayoutData" w-full h-full />

    <!-- </a-card> -->
  </div>
</template>


<style scoped></style>
