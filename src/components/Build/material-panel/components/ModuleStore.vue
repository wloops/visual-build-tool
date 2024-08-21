<script setup>
import SelectModel from './SelectModel.vue'

import numberSixFill from '~icons/ph/number-six-fill'
import IconBar from '~icons/material-symbols/bar-chart-4-bars-rounded'
import IconLine from '~icons/streamline/graph-solid'
import IconPie from '~icons/ic/baseline-pie-chart'
import IconDesc from '~icons/mdi/order-alphabetical-descending'
import IconStatus from '~icons/material-symbols/signal-wifi-statusbar-not-connected'
import IconTable from '~icons/mdi/table-large'
import IconEmail from '~icons/ic/round-attach-email'
import IconTop from '~icons/mdi/format-align-top'
import IconDetails from '~icons/tabler/list-details'
import { useSelectBoxStore } from '@/stores/selectBox'
import { useMaterialStore } from '@/stores/material'
import { nextTick } from 'vue'

const materialStore = useMaterialStore()
const selectBoxStore = useSelectBoxStore()
const isSelected = ref(false)

watchEffect(() => {
  isSelected.value =
    selectBoxStore.selectedBox && selectBoxStore.selectedBox.actived === true
})

const pluginList = shallowRef([
  {
    name: '基础',
    id: 'base',
    children: [
      {
        name: '统计数据',
        type: 'countNumber',
        icon: numberSixFill
      },
      {
        name: '详情面板',
        type: 'infos',
        icon: IconDesc
      },
      {
        name: '状态监控',
        type: 'iconLists',
        icon: IconStatus
      },
      {
        name: '告警表格',
        type: 'table',
        icon: IconTable,
        imgUrl:
          'https://wloop-sy.oss-cn-hongkong.aliyuncs.com/picgo/202408201551286.png'
      },
      {
        name: 'top5',
        type: 'progressTop',
        icon: IconTop
      }
    ]
  },
  {
    name: '图表',
    id: 'chart',
    children: [
      {
        name: '柱状图',
        type: 'bar',
        icon: IconBar
      },
      {
        name: '折线图',
        type: 'line',
        icon: IconLine
      },
      {
        name: '饼图',
        type: 'pie',
        icon: IconPie
      }
    ]
  },
  {
    name: '其他',
    id: 'other',
    children: [
      {
        name: '节点链接',
        type: 'graph',
        icon: IconEmail
      },
      {
        name: '设备详情',
        type: 'deviceDetails',
        icon: IconDetails
      }
    ]
  }
])

const selectModel = ref(null)
const openPlugin = (plugin, f_plugin) => {
  console.log('绑定块:', selectBoxStore.selectedBox)
  console.log('openPlugin:', plugin)
  plugin = { ...plugin, f_type_id: f_plugin.id, ...selectBoxStore.selectedBox }
  selectModel.value.show(plugin)
}

const charts = ref([])
const storeCharts = (chart, defineChart) => {
  console.log('storeCharts:', chart, defineChart)
  charts.value = [...chart]

  // 根据id找到layoutParams(多级)中对应的对象,添加type
  let type = defineChart.type
  if (defineChart.f_type_id === 'chart') {
    type = `${defineChart.f_type_id}|${defineChart.type}`
  }
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

  console.log('layoutParams::', materialStore.layoutParams)
}

// watch(
//   () => materialStore.layoutParams.list,
//   (newVal) => {
//     console.log('selectModel:watch*', newVal)
//     nextTick(() => {
//       if (charts.value.length > 0) {
//         charts.value.forEach((chart) => {
//           chart.resize()
//         })
//       }
//     })
//   },
//   {
//     deep: true
//   }
// )
</script>

<template>
  <div>
    <a-col :span="23" v-if="!isSelected">
      <a-alert type="warning">请先选中一个块</a-alert>
    </a-col>
    <a-col :span="23" v-else>
      <a-alert type="success">{{ `选择插入下列组件` }}</a-alert>
      <!-- <a-alert type="success"
        >{{ `已选中:` }}<br />{{ selectBoxStore.selectedBox.name }}</a-alert
      > -->
    </a-col>

    <a-scrollbar style="height: 78vh; overflow: auto">
      <div
        :class="isSelected ? '' : 'not-clickable'"
        v-for="plugin in pluginList"
        :key="plugin.name"
      >
        <h3>{{ plugin.name }}</h3>
        <div w-full flex flex-wrap justify-start items-center>
          <div
            v-for="child in plugin.children"
            :key="child.name"
            class="plugin-item"
            @click="openPlugin(child, plugin)"
          >
            <component
              v-if="child.icon"
              :is="child.icon"
              class="text-24px"
            ></component>
            <div text-12px mt-2>{{ child.name }}</div>
          </div>
        </div>
      </div>
    </a-scrollbar>

    <select-model ref="selectModel" @storeCharts="storeCharts"></select-model>
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
