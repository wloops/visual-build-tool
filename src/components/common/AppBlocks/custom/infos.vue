<script setup>

const props = defineProps({
  config: {
    type: Object,
    default: () => { }
  }
})

const descData = [
  {
    key: 'name',
    label: '设备标识',
    value: 'SJ1310-HSM-02'
  },
  {
    key: 'ip',
    label: 'IP地址',
    value: '192.168.1.1'
  },
  {
    key: 'port',
    label: '端口',
    value: '8080'
  },
  {
    key: 'version',
    label: '版本',
    value: 'V1.0.0'
  },
  {
    key: 'status',
    label: '启动时间',
    value: '2021-01-01 10:00:00'
  },
  {
    key: 'uptime',
    label: '运行时长',
    value: '100天'
  },
  {
    key: 'cpu',
    label: 'CPU使用率',
    value: 80,
    type: 'progress',
    span: 1

  },
  {
    key: 'ram',
    label: '内存使用率',
    value: 60,
    type: 'progress'
  }
]

const descColumn = ref(1)
const setSpan = (item) => {
  const maxSpanList = ['cpu', 'ram']
  if (maxSpanList.includes(item.key)) {
    return descColumn.value
  }
  return 1
}
</script>

<template>
  <div p-10 flex flex-col justify-between>
    <div>
      <n-scrollbar trigger="none" :style="{ maxHeight: config.height }">

        <n-descriptions label-placement="left" bordered title="" :column="descColumn" size="small">
          <n-descriptions-item :label-style="{ color: '#818991', fontSize: '13px' }" v-for="(item, index) in descData"
            :key="index" :span="setSpan(item)">
            <template #label>
              {{ item.label }}
            </template>
            <div v-if="item.type === 'progress'">
              <n-progress :percentage="item.value" type="line" :height="12" />
            </div>
            <span v-else style="font-size: 13px;">{{ item.value }}</span>
          </n-descriptions-item>
        </n-descriptions>
      </n-scrollbar>
    </div>
    <!-- <div overflow-hidden flex justify-center items-center>
      <n-scrollbar trigger="none" x-scrollable :style="{ width: data.width, maxHeight: '100%' }">
        <div class="custom-infos-status" h-150 flex justify-center items-center>
          <div class="custom-infos-status-item" v-for="(item, index) in 10" :key="index" mr-20 flex justify-center
            items-center flex-col>
            <CustomIcon icon="server" color="red" :size="80" type="custom"></CustomIcon>
            <div class="custom-infos-status-item-text">XX服务</div>
          </div>
        </div>
      </n-scrollbar>
    </div> -->
  </div>
</template>


<style scoped>
:deep(.n-descriptions-table-wrapper) {
  background-color: transparent !important;
  border: 0 !important;
}

:deep(.n-descriptions-table-header) {
  background-color: rgba(255, 255, 255, 0.05) !important;
  border: 0 !important;
}

:deep(.n-descriptions-table-content) {
  border: 0 !important;
}
</style>
