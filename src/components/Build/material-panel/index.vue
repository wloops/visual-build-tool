<script setup>
import IconRiLayout5Fill from '~icons/ri/layout-5-fill'
import signalAlt3 from '~icons/uit/signal-alt-3'
import pluginLine from '~icons/clarity/plugin-solid'
import MaterialLayout from './components/MaterialLayout.vue'
import ChartStore from './components/ChartStore.vue'

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
  // {
  //   name: '图表',
  //   key: '2',
  //   icon: signalAlt3,
  //   disabled: false,
  //   component: ChartStore,
  //   desc: '用于展示数据的可视化图表，包括折线图、柱状图、饼图等。'
  // },
  {
    name: '组件',
    key: '2',
    icon: pluginLine,
    disabled: false,
    component: ChartStore,
    desc: '提供一些常用的功能插件，如图表、日历、上传、地图等。'
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
    if (newVal) {

      // console.log('selectedBox', document.querySelector(`#${newVal.id}`))
    }
    if (newVal && newVal.actived === true) {
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
    <a-card :style="{ width: '100%', height: '89vh', marginLeft: '10px', padding: '0px' }"
      :header-style="{ border: '0px' }" hoverable :bordered="false">
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
