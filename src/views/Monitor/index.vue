<script setup>
import autofit from 'autofit.js'
const canvasLayoutData = ref({})
const updateKey = ref(false)
const callback = (data) => {
  console.log('callback', data)
  canvasLayoutData.value = data
  updateKey.value = false
  updateKey.value = true
}
onMounted(() => {
  autofit.init({
    dh: 1080,
    dw: 1920,
    el: '#canvas-panel-main',
    resize: true,
  })
})
</script>

<template>
  <div class="build-main" w-full h-full>
    <!-- 全局操作栏 -->
    <div class="build-header" w-full h-full>
      <global-action-bar></global-action-bar>
    </div>
    <!-- 构建区域 -->
    <div class="build-container" flex w-full h-full justify-between items-center>
      <!-- 物料区 构建区域左侧 -->
      <div id="material-panel" class="build-left material-panel panel mb-5">
        <material-panel />
      </div>
      <!-- 画布区 构建区域中部 -->
      <div id="canvas-panel" class="build-center canvas-panel panel mb-5" flex justify-center items-center>
        <canvas-panel v-if="updateKey" id="canvas-panel-main" :canvasLayoutData="canvasLayoutData" />
      </div>
      <!-- 属性区 构建区域右侧 -->
      <div id="attribute-panel" class="build-right attribute-panel panel mb-5">
        <attribute-panel @callback="callback" />
      </div>
    </div>
  </div>
</template>


<style scoped>
.build-main {
  height: calc(100vh - 60px);
  background-color: var(--color-neutral-1);
  /* background: url(./images/bg.jpg) no-repeat top center; */
  /* line-height: 1.15; */
  width: 100%;
  /* height: 100vh; */
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.build-header {
  height: 50px;
}

.build-container {
  width: 100%;
  height: calc(100% - 50px);
  display: flex;

  .material-panel {
    flex: 2;
  }

  .canvas-panel {
    flex: 7;
    background-color: var(--color-neutral-3);
  }

  .attribute-panel {
    flex: 2.5;
  }
}

.panel {
  height: 100%;
}
</style>
