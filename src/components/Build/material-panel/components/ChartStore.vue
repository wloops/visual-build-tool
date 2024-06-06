<script setup>
import { useSelectBoxStore } from '@/stores/selectBox'
const selectBoxStore = useSelectBoxStore()
const isSelected = ref(false)

watchEffect(() => {
  isSelected.value = selectBoxStore.selectedBox && selectBoxStore.selectedBox.actived === true
})
</script>

<template>
  <div>
    <a-col :span="23" v-if="!isSelected">
      <a-alert type="warning">请先选中一个块</a-alert>
    </a-col>
    <a-col :span="23" v-else>
      <a-alert type="success">{{ `已选中:${selectBoxStore.selectedBox.name}` }}</a-alert>
    </a-col>
  </div>
</template>


<style scoped></style>
