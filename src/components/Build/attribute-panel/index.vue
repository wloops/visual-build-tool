<script setup>
import { useMaterialStore } from '@/stores/material'
import { useSelectBoxStore } from '@/stores/selectBox'
import AttrLayoutPanel from './components/AttrLayoutPanel.vue'
import BackgroundPanel from './components/BackgroundPanel.vue';


const materialStore = useMaterialStore()
const selectBoxStore = useSelectBoxStore()
const emit = defineEmits(['callback'])


const layoutModel = ref(materialStore.materialLayout)
const attrs = ref([
  {
    name: '布局参数',
    key: 'layout',
    component: AttrLayoutPanel,
  },
  {
    name: '背景调整',
    key: 'background',
    component: BackgroundPanel,
  },
])

watch(
  () => materialStore.materialLayout,
  (newVal) => {
    layoutModel.value = newVal
  }
)
watch(
  () => selectBoxStore.selectedBox,
  (newVal) => {
    console.log('selectedBox', newVal)
    console.log('selectedBox', document.querySelector(`#${newVal.id}`))
  }
)

function callback(data) {
  emit('callback', data)
}
</script>

<template>
  <div flex justify-center items-center>
    <a-card :style="{ width: '90%', height: '85vh', margin: '15px', paddingTop: '0' }" :header-style="{ border: '0px' }"
      title="属性面板" hoverable :bordered="false">
      <template #extra>
        <a-link>{{ layoutModel }}</a-link>
      </template>

      <a-tabs position="top" type="line" size="large">
        <a-tab-pane v-for="item in attrs" :key="item.key" :title="item.name">
          <component :is="item.component" :model="layoutModel" @callback="callback" h-70vh overflow-y-auto />
        </a-tab-pane>

      </a-tabs>
    </a-card>
  </div>
</template>


<style scoped>
:deep(.arco-card-size-medium .arco-card-body) {
  padding: 0px 15px;
}
</style>
