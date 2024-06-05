<script setup>
import autofit from 'autofit.js'
// onMounted(() => {
//   autofit.init({
//     dh: 1080,
//     dw: 1920,
//     el: '#canvas-panel-main',
//     resize: true,
//   })
// })
const canvasLayoutData = ref({})
const updateKey = ref(false)
const callback = (data) => {
  console.log('callback', data)
  canvasLayoutData.value = data
  updateKey.value = false
  updateKey.value = true
}
</script>

<template>
  <div class="build-main" w-full>
    <!-- 全局操作栏 -->
    <div class="build-header" w-full>全局操作栏</div>
    <!-- 构建区域 -->
    <div class="build-container" flex w-full h-full justify-between items-center>
      <!-- 物料区 构建区域左侧 -->
      <div id="material-panel" class="build-left material-panel panel">
        <material-panel />
      </div>
      <!-- 画布区 构建区域中部 -->
      <div id="canvas-panel" class="build-center canvas-panel panel" flex justify-center items-center>
        <canvas-panel v-if="updateKey" id="canvas-panel-main" :canvasLayoutData="canvasLayoutData" />
      </div>
      <!-- 属性区 构建区域右侧 -->
      <div id="attribute-panel" class="build-right attribute-panel panel">
        <attribute-panel @callback="callback" />
      </div>
    </div>
  </div>
</template>


<style scoped>
.build-main {
  height: calc(100vh - 60px);
  background-color: var(--color-neutral-2);
}

.build-header {
  height: 35px;
}

.build-container {
  width: 100%;
  height: calc(100% - 35px);
  display: flex;

  .material-panel {
    flex: 3;
  }

  .canvas-panel {
    flex: 7;
  }

  .attribute-panel {
    flex: 3;
  }
}

.panel {
  height: 100%;
}
</style>
