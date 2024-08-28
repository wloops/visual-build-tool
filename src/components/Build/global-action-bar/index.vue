<script setup>
import {
  IconClose,
  IconToBottom,
  IconDelete
} from '@arco-design/web-vue/es/icon'
import { useSelectBoxStore } from '@/stores/selectBox'
import { useMaterialStore } from '@/stores/material'

import DownloadModal from './components/DownloadModal.vue'

const materialStore = useMaterialStore()
const selectBoxStore = useSelectBoxStore()
const isSelected = ref(false)

watchEffect(() => {
  isSelected.value =
    selectBoxStore.selectedBox && selectBoxStore.selectedBox.actived === true
})

const clearSelectBox = () => {
  selectBoxStore.clearSelectedBox()
  // 清除选中样式
  const activedBoxs = document.querySelectorAll('.actived')
  activedBoxs.forEach(box => {
    box.classList.remove('actived')
  })
}
const revertSelectedBox = () => {
  const defineChart = selectBoxStore.selectedBox
  const type = ''
  // 遍历查找 layoutParams.list->innerBoxs->children 的每一项的id是否和defineChart.id相同
  for (let i = 0; i < materialStore.layoutParams.list.length; i++) {
    const innerBoxs = materialStore.layoutParams.list[i].innerBoxs
    for (let j = 0; j < innerBoxs.length; j++) {
      const children = innerBoxs[j].children
      for (let k = 0; k < children.length; k++) {
        if (children[k].id === defineChart.id) {
          children[k].type = type
          break
        }
      }
    }
  }
}

const downloadModal = ref(null)

const downloadJSON = () => {
  console.log('downloadJSON-materialLayout::', materialStore.materialLayout)
  console.log('downloadJSON-layoutParams::', materialStore.layoutParams.list)
  const data = {
    model: materialStore.materialLayout,
    layoutParams: materialStore.layoutParams.list
  }
  downloadModal.value.show(data)
}
</script>

<template>
  <div flex justify-center items-center w-full h-full>
    <div class="global-action-bar-left" pl-10px></div>
    <div class="global-action-bar-center" flex justify-end items-center>
      <a-button
        type="dashed"
        size="mini"
        v-show="isSelected"
        @click="revertSelectedBox"
      >
        <template #icon>
          <icon-delete />
        </template>
        <!-- Use the default slot to avoid extra spaces -->
        <template #default>还原模块</template>
      </a-button>
      <a-button
        type="dashed"
        size="mini"
        v-show="isSelected"
        @click="clearSelectBox"
      >
        <template #icon>
          <icon-close />
        </template>
        <!-- Use the default slot to avoid extra spaces -->
        <template #default>取消选中</template>
      </a-button>
    </div>
    <div class="global-action-bar-right" flex justify-end items-center>
      <a-button type="dashed" size="mini" @click="downloadJSON" mr-10px>
        <template #icon>
          <icon-to-bottom />
        </template>
        <!-- Use the default slot to avoid extra spaces -->
        <template #default>下载</template>
      </a-button>
    </div>
  </div>

  <download-modal ref="downloadModal" />
</template>

<style scoped>
.global-action-bar-left {
  flex: 2;
}

.global-action-bar-center {
  flex: 7;
}

.global-action-bar-right {
  flex: 2.5;
}
</style>
