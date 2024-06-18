<script setup>
import { useCommonChart } from '@/hooks/useCommonChart'
import { ref } from 'vue';
const { chartOptions, getOption, init } = useCommonChart()

const emit = defineEmits(['storeCharts'])

const defineChart = ref({})
const charts = ref([])
const visible = ref(false);
const radioValue = ref(0);
const changeValue = (value) => {
  console.log('selectModel:changeValue*', value)
}
const handleOk = () => {
  const dom = document.getElementById(defineChart.value.id)
  const chart = init(dom, defineChart.value.type, radioValue.value)
  charts.value.push(chart)
  emit('storeCharts', charts.value)
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
}

const chartTypes = ref([])

const show = (plugin) => {
  defineChart.value = plugin
  console.log('selectModel:show*', plugin)
  console.log('div^:', document.getElementById(plugin.id))
  chartTypes.value = getOption(plugin.type)
  visible.value = true;
}
// 暴露方法
defineExpose({ show })
</script>

<template>
  <div>
    <a-modal width="70%" v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
      <template #title>
        Title
      </template>
      <div :style="{
        boxSizing: 'border-box',
        width: '100%',
        maxHeight: '65vh',
        padding: '20px',
      }">
        <a-radio-group v-model="radioValue" @change="changeValue" v-if="chartTypes && chartTypes.length > 0">
          <a-row :gutter="20" :style="{ marginBottom: '20px' }">
            <a-col :span="8" :style="{ marginBottom: '20px' }" v-for="(item, index) in chartTypes">
              <a-card class="card-demo" cursor-pointer hoverable :title="item.optionName" bordered
                :style="{ width: '100%' }" @click="radioValue = index">
                <template #extra m-0>
                  <a-radio :value="index"></a-radio>
                </template>
                <img :style="{ width: '100%', transform: 'translateY(-20px)' }" alt="dessert"
                  src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp" />
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
