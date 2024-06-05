<script setup>
import IconRiLayout5Fill from '~icons/ri/layout-5-fill'
import signalAlt3 from '~icons/uit/signal-alt-3'
import pluginLine from '~icons/clarity/plugin-line'
import MaterialLayout from './components/MaterialLayout.vue'

import { useSelectBoxStore } from '@/stores/selectBox'
const selectBoxStore = useSelectBoxStore()

const materialList = ref([
  {
    name: '布局',
    key: '1',
    icon: IconRiLayout5Fill,
    disabled: false,
    component: MaterialLayout,
    desc: '用于构建页面的基础组件，包括按钮、输入框、表格、布局、导航等。'
  },
  {
    name: '图表',
    key: '2',
    icon: signalAlt3,
    disabled: false,
    component: '暂无1',
    desc: '用于展示数据的可视化图表，包括折线图、柱状图、饼图等。'
  },
  {
    name: '插件',
    key: '3',
    icon: pluginLine,
    disabled: false,
    component: '暂无',
    desc: '提供一些常用的功能插件，如日历、上传、地图等。'
  }
])
let activeKey = ref('1')
function handleTabChange(key) {
  activeKey.value = key
}


watch(
  () => selectBoxStore.selectedBox,
  (newVal) => {
    console.log('selectedBox', newVal)
    console.log('selectedBox', document.querySelector(`#${newVal.id}`))
    if (newVal.actived === true) {
      activeKey.value = '2'
      materialList.value[0].disabled = true
    }
    else {
      materialList.value[0].disabled = false
      activeKey.value = '1'
    }
  }
)
</script>

<template>
  <div flex justify-center items-center>
    <a-card :style="{ width: '90%', height: '85vh', margin: '15px', padding: '0px' }" :header-style="{ border: '0px' }"
      hoverable :bordered="false">
      <a-tabs position="left" type="line" size="large" :active-key="activeKey" @change="handleTabChange">
        <a-tab-pane v-for="item in materialList" :key="item.key" :title="item.name"
          :disabled="item.component === '暂无' || item.disabled">
          <template #title flex flex-col justify-center items-center>
            <component :is="item.icon" class="text-20px"></component>
            <div>{{ item.name }}</div>
          </template>
          <div>
            <component :is="item.component"></component>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>


<style scoped>
:deep(.arco-card-size-medium .arco-card-body) {
  padding: 15px 0;
}
</style>
