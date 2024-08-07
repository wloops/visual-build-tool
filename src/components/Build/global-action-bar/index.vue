<script setup>
import { IconClose,IconToBottom,IconDelete } from '@arco-design/web-vue/es/icon';
import { useSelectBoxStore } from '@/stores/selectBox'
import { useMaterialStore } from '@/stores/material'

const materialStore = useMaterialStore()
const selectBoxStore = useSelectBoxStore()
const isSelected = ref(false)

watchEffect(() => {
  isSelected.value = selectBoxStore.selectedBox && selectBoxStore.selectedBox.actived === true
})

const clearSelectBox = () => {
  selectBoxStore.clearSelectedBox()
  // 清除选中样式
  const activedBoxs = document.querySelectorAll('.actived')
  activedBoxs.forEach(box => {
    box.classList.remove('actived')
  })
}

const downloadJSON = () => {
  console.log('downloadJSON-materialLayout::', materialStore.materialLayout)
  console.log('downloadJSON-layoutParams::', materialStore.layoutParams.list)
}
</script>

<template>
  <div flex justify-center items-center h-full>
    <div class="global-action-bar-left"></div>
    <div class="global-action-bar-center" flex justify-end items-center>
      <a-button type="dashed" size="small" v-show="isSelected" @click="clearSelectBox">
        <template #icon>
          <icon-close />
        </template>
        <!-- Use the default slot to avoid extra spaces -->
        <template #default>取消选中</template>
      </a-button>
    </div>
    <div class="global-action-bar-right" flex justify-end items-center mt-5 p-5>
      <a-button type="primary" size="mini" @click="downloadJSON">
      <template #icon>
        <icon-to-bottom />
      </template>
    </a-button>
    </div>
  </div>
</template>


<style scoped>
.global-action-bar-left {
  flex: 3;
}

.global-action-bar-center {
  flex: 7;
}

.global-action-bar-right {
  flex: 3;
}
</style>
