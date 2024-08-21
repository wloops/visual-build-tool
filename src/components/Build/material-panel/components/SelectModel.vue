<script setup>
import { useCommonChart } from '@/hooks/useCommonChart'
import { ref } from 'vue'
const { chartOptions, getOption, getOptions, init } = useCommonChart()

const emit = defineEmits(['storeCharts'])

const defineChart = ref({})
const charts = ref([])
const visible = ref(false)
const radioValue = ref(0)
const changeValue = value => {
  console.log('selectModel:changeValue*', value)
}
const handleOk = () => {
  if (defineChart.value.f_type_id === 'chart') {
    const dom = document.getElementById(defineChart.value.id)
    const chart = init(dom, defineChart.value.type)
    charts.value.push(chart)
    emit('storeCharts', charts.value, defineChart.value)
  } else {
    emit('storeCharts', charts.value, defineChart.value)
  }
  visible.value = false
}
const handleCancel = () => {
  visible.value = false
}

const chartTypes = ref([])

const show = plugin => {
  defineChart.value = plugin
  // console.log('div^:', document.getElementById(plugin.id))
  console.log('plugin^:', plugin.type, plugin)

  if (plugin.f_type_id === 'chart') {
    chartTypes.value = getOptions(plugin.type)
  } else {
    chartTypes.value = [
      {
        chartID: plugin.type
      }
    ]
  }
  console.log('selectModel:show*', plugin, chartTypes.value)
  visible.value = true
}
// 暴露方法
defineExpose({ show })
</script>

<template>
  <div>
    <a-modal
      width="70%"
      v-model:visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <template #title>
        {{ defineChart.name }}
      </template>
      <div
        :style="{
          boxSizing: 'border-box',
          width: '100%',
          maxHeight: '65vh',
          padding: '20px'
        }"
      >
        <a-radio-group
          v-model="radioValue"
          @change="changeValue"
          v-if="chartTypes && chartTypes.length > 0"
        >
          <a-row :gutter="20" :style="{ marginBottom: '20px' }">
            <a-col
              :span="8"
              :style="{ marginBottom: '20px' }"
              v-for="(item, index) in chartTypes"
            >
              <a-card
                class="card-demo"
                cursor-pointer
                hoverable
                :title="item.chartID"
                bordered
                :style="{ width: '100%' }"
                @click="radioValue = index"
              >
                <template #extra m-0>
                  <a-radio :value="index"></a-radio>
                </template>
                <div :style="{ width: '100%', transform: 'translateY(-20px)' }">
                  <component
                    :is="defineChart.icon"
                    class="text-60px"
                  ></component>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </a-radio-group>
        <div v-else>
          <a-empty />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style scoped>
:deep(.arco-card-header) {
  border-bottom: none;
}

.arco-radio-group .arco-radio {
  margin-right: 0px;
}

.card-demo {
  width: 360px;
  margin-left: 24px;
  transition-property: all;
}

.card-demo:hover {
  transform: translateY(-4px);
}
</style>
