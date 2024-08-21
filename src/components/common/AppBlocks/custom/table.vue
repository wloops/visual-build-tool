<script setup>
import CustomTable from './CustomTable.vue'
const props = defineProps(['config', 'data'])

watch(
  () => props.data,
  () => {
    initTable()
  }
)

onMounted(() => {
  initTable()
})

const alarmData = ref({
  data: [
    { level: '1', detail: '告警信息1', datetime: '2022-01-01 10:00:00' },
    { level: '2', detail: '告警信息2', datetime: '2022-01-01 11:00:00' },
    { level: '3', detail: '告警信息3', datetime: '2022-01-01 12:00:00' }
  ],
  header: [
    { name: '告警级别', param: 'level', width: 1 },
    { name: '告警信息', param: 'detail', width: 3 },
    { name: '告警时间', param: 'datetime', width: 3 }
  ]
})
const tableConfig = ref({
  width: '100%',
  height: '100%',
  isRoll: false,
  'wrap-class': '#id'
})
const tableFlag = ref(false)
const initTable = () => {
  tableFlag.value = false
  console.log('initTable data:', props.data)
  if (props.config.request) {
    alarmData.value = props.data ? props.data : {}
    console.log(document.querySelector('#' + props.config.fatherID))
    tableConfig.value = {
      isRoll: false,
      'wrap-class': '#' + props.config.fatherID
    }
  }
  tableFlag.value = true
}
</script>

<template>
  <div v-if="tableFlag" :id="props.config.id" w-full h-full>
    <custom-table
      :tb-data="alarmData.data"
      :tb-header="alarmData.header"
      :table-config="tableConfig"
    ></custom-table>
  </div>
</template>

<style scoped></style>
