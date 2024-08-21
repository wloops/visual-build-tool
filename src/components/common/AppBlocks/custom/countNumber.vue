<script setup>
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  },
  data: {
    type: Object,
    default: () => ({})
  }
})
const deviceCountNum = ref({})
const oldDeviceCountNum = ref({
  total: 0,
  fail: 0
})

console.log('props config:', props.config)
deviceCountNum.value = props.data
watch(
  () => ({ ...props.data }),
  (newValue, oldValue) => {
    deviceCountNum.value = newValue
    if (oldValue) {
      oldDeviceCountNum.value = oldValue
    }
    console.log('countNumber', newValue, oldValue)
  },
  {
    deep: true,
    immediate: true
  }
)
// watch(props.data, (newVal, oldVal) => {
//   console.log('countNumber newVal', newVal, oldVal)
//   deviceCountNum.value = newVal
// }, {
//   deep: true,
//   immediate: true
// })
</script>

<template>
  <div>
    <div class="container w-full h-full">
      <div
        class="glass card-notbg"
        data-text=""
        data-text-2="今日交易笔数"
        h-full
        pt-0
        flex
        flex-col
        justify-center
        items-center
      >
        <div class="countBox w-full flex justify-center items-center flex-1">
          <n-statistic label="" tabular-nums>
            <n-number-animation
              ref="numAnimRefCount"
              :from="oldDeviceCountNum.total ? oldDeviceCountNum.total : 0"
              :to="deviceCountNum.total"
              :active="true"
              :precision="0"
              locale="en-US"
              show-separator
            />
            <template #suffix>次</template>
          </n-statistic>
        </div>
        <div class="areBox w-full flex justify-around items-center flex-1">
          <div class="onlineBox glass onoff card-notbg" data-text-2="交易成功">
            <n-statistic label="" tabular-nums>
              <n-number-animation
                ref="numAnimRefOnline"
                :from="oldDeviceCountNum.total - oldDeviceCountNum.fail ?? 0"
                :to="deviceCountNum.total - deviceCountNum.fail ?? 0"
                :active="true"
                :precision="0"
                locale="en-US"
                show-separator
              />
              <template #suffix>次</template>
            </n-statistic>
          </div>
          <div class="offlineBox glass onoff card-notbg" data-text-2="交易失败">
            <n-statistic label="" tabular-nums>
              <n-number-animation
                ref="numAnimRefOffline"
                :from="oldDeviceCountNum.fail ? oldDeviceCountNum.fail : 0"
                :to="deviceCountNum.fail"
                :active="true"
                :precision="0"
                locale="en-US"
                show-separator
              />
              <template #suffix>次</template>
            </n-statistic>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* :deep(.n-statistic) {
  margin-top: 20px;
} */

:deep(.n-statistic .n-statistic__label) {
  text-align: end;
  color: #b1b2bb;
  font-size: 20px;
}

:deep(.n-statistic .n-statistic-value) {
  text-align: end;
}

:deep(.n-statistic .n-statistic-value__content) {
  color: #5486f3;
  font-size: 56px;
  font-weight: 600;
  font-family: electronicFont;
}

:deep(.n-statistic .n-statistic-value__suffix) {
  color: #0586bd;
  font-size: small;
}

:deep(.onoff .n-statistic .n-statistic-value__content) {
  font-size: 36px;
  color: #18a058;
}

:deep(.onoff:nth-child(2) .n-statistic .n-statistic-value__content) {
  color: #c27666;
}

.container .glass {
  position: relative;
  /* width: 95%;
  height: 27vh; */
  /* background: transparent; */
  /* border: 1px solid rgba(2, 24, 68, 0.1); */
  /* box-shadow: 0 25px 25px rgba(0, 0, 0, 0.15); */
  /* border: 2px dashed rgba(64, 121, 226, 0.35); */

  display: flex;
  justify-content: center;
  align-items: end;
  transition: 0.5s;
  border-radius: 10px;
  padding-bottom: 5px;
  margin: 10px;
  /* backdrop-filter: blur(10px); */
  transform: rotate(calc(var(--r) * 1deg));
}

.container .glass::after {
  content: attr(data-text-2);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  /* background: rgba(255, 255, 255, 0.05); */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  border-radius: 10px 10px 0 0;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  /* margin-top: -20px; */
}

.onlineBox,
.offlineBox {
  width: 50%;
  height: 90%;
}
</style>
