<script setup>
import numberSixFill from '~icons/ph/number-six-fill'
import IconBar from '~icons/material-symbols/bar-chart-4-bars-rounded'
import IconLine from '~icons/streamline/graph-solid'
import IconPie from '~icons/ic/baseline-pie-chart'
import { useSelectBoxStore } from '@/stores/selectBox'
const selectBoxStore = useSelectBoxStore()
const isSelected = ref(false)

watchEffect(() => {
  isSelected.value = selectBoxStore.selectedBox && selectBoxStore.selectedBox.actived === true
})

const pluginList = ref([
  {
    name: '基础',
    id: 'base',
    children: [
      {
        name: '数值动画',
        icon: numberSixFill
      }
    ]
  },
  {
    name: '图表',
    id: 'chart',
    children: [
      {
        name: '柱状图',
        id: 'bar',
        icon: IconBar,
      },
      {
        name: '折线图',
        id: 'line',
        icon: IconLine
      },
      {
        name: '饼图',
        id: 'pie',
        icon: IconPie
      }
    ]
  }
])

const openPlugin = (plugin) => {
  console.log('绑定块:', selectBoxStore.selectedBox)
  console.log('openPlugin:', plugin)
}
</script>

<template>
  <div>
    <a-col :span="23" v-if="!isSelected">
      <a-alert type="warning">请先选中一个块</a-alert>
    </a-col>
    <a-col :span="23" v-else>
      <a-alert type="success">{{ `已选中:${selectBoxStore.selectedBox.name}` }}</a-alert>
    </a-col>

    <div :class="isSelected ? '' : 'not-clickable'" v-for="plugin in pluginList" :key="plugin.name">
      <h3>{{ plugin.name }}</h3>
      <div w-full flex flex-wrap justify-start items-center>
        <div v-for="child in plugin.children" :key="child.name" class="plugin-item" @click="openPlugin(child)">
          <component v-if="child.icon" :is="child.icon" class="text-24px"></component>
          <div text-14px mt-2>{{ child.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.plugin-item {
  @apply w-15 h-15 flex flex-col justify-center items-center p-2 m-2 bg-gray-100 rounded-md cursor-pointer;
}

.not-clickable {
  pointer-events: none;
  /* 这将改变鼠标光标为默认样式，表示该元素无法交互 */
  cursor: default;
  /* 置灰 */

  opacity: 0.5;

}
</style>
