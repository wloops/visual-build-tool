<script setup>
const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  data: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div flex justify-center items-center flex-col>
    <n-statistic label="平均响应时间" tabular-nums mr-10>
      <n-number-animation ref="numberAnimationInstRef" :from="0" :to="866" :active="true" :precision="0" locale="en-US"
        show-separator />
      <template #suffix>ms</template>
    </n-statistic>
    <n-statistic label="最大响应时间" tabular-nums mr-10>
      <n-number-animation ref="numberAnimationInstRef" :from="0" :to="866" :active="true" :precision="0" locale="en-US"
        show-separator />
      <template #suffix>ms</template>
    </n-statistic>
    <n-statistic label="最小响应时间" tabular-nums mr-10>
      <n-number-animation ref="numberAnimationInstRef" :from="0" :to="866" :active="true" :precision="0" locale="en-US"
        show-separator />
      <template #suffix>ms</template>
    </n-statistic>
  </div>
</template>


<style scoped>
:deep(.n-statistic .n-statistic__label) {
  text-align: end;
  color: #b1b2bb;
  font-size: 12px;
  margin-right: 10px;
}

:deep(.n-statistic .n-statistic-value) {
  text-align: end;
}

:deep(.n-statistic .n-statistic-value__content) {
  color: #00cae6;
  font-size: 22px;
  font-weight: 600;
  font-family: electronicFont;
}

:deep(.n-statistic .n-statistic-value__suffix) {
  color: #0586bd;
  font-size: small;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
