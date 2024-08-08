<script setup>
import { useMaterialStore } from '@/stores/material'
import { useSelectBoxStore } from '@/stores/selectBox'
import AttrLayoutPanel from './components/AttrLayoutPanel.vue'
import BackgroundPanel from './components/BackgroundPanel.vue';


const materialStore = useMaterialStore()
const selectBoxStore = useSelectBoxStore()
const emit = defineEmits(['callback'])


const layoutModel = ref(materialStore.materialLayout)
const layoutAttrs = [
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
]
const blackAttr = [
  {
    name: '图表参数',
    key: 'layout1',
    component: BackgroundPanel,
  },
  {
    name: '修改源码',
    key: 'background1',
    component: BackgroundPanel,
  },
]

const attrs = ref(layoutAttrs)
let activeKey = true
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
    activeKey = false
    if (newVal && newVal.actived === true) {
      attrs.value = blackAttr
    } else {
      attrs.value = layoutAttrs
    }
    activeKey = true
    console.log('attrs', attrs.value)
    // console.log('selectedBox', document.querySelector(`#${newVal.id}`))
  }
)

function callback(data) {
  emit('callback', data)
}
</script>

<template>
  <div flex justify-center items-center>
    <a-card :style="{ width: '100%', height: '89vh', marginRight: '10px', paddingTop: '0' }"
      :header-style="{ border: '0px' }" title="属性面板" hoverable :bordered="false">
      <template #extra>
        <a-link>{{ layoutModel }}</a-link>
      </template>

      <div>

        <a-tabs position="top" type="line" size="large" lazy-load>
          <a-tab-pane v-for="item in attrs" :key="item.key" :title="item.name">
            <component :key="item.key" :is="item.component" :model="layoutModel" @callback="callback" h-70vh
              overflow-y-auto />
          </a-tab-pane>

        </a-tabs>
      </div>
    </a-card>
  </div>
</template>


<style scoped>
:deep(.arco-card-size-medium .arco-card-body) {
  padding: 0px 15px;
}
</style>
