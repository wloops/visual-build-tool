<script setup>
import { useThemeVars } from 'naive-ui'
import { watch } from 'vue'

const props = defineProps(['config', 'data', 'unit'])
const data = ref([
  {
    name: 'CPU',
    number: 80,
    percent: 80
  },
  {
    name: 'Memory',
    number: 60,
    percent: 60
  },
  {
    name: 'Disk',
    number: 70,
    percent: 70
  },
  {
    name: 'Network',
    number: 90,
    percent: 90
  },
  {
    name: 'Temperature',
    number: 60,
    percent: 60
  }
])

const config = ref({
  unit: '%'
})

watch(
  () => props.data,
  val => {
    data.value = val
  }
)

watch(
  () => props.config,
  val => {
    config.value = val.config
  }
)

console.log('LoadTop.vue data: ', data.value)
const themeVars = useThemeVars()

const getSortedData = data => {
  return data.sort((a, b) => Number(b.percent) - Number(a.percent))
}

const setTitleMaxWidth = data => {
  // 计算最大的标题宽度,中文字符宽度为15px,英文字符宽度为8px
  let max = 0
  data.forEach(item => {
    const length = item.name.length
    const width = length * (item.name.match(/[\u4e00-\u9fa5]/g) ? 15 : 8)
    if (width > max) {
      max = width
    }
  })
  return `${max}px`
}
const maxWidth = ref('100px')
onMounted(() => {
  maxWidth.value =
    setTitleMaxWidth(data.value) !== '0px'
      ? setTitleMaxWidth(data.value)
      : '100px'
  console.log('LoadTop.vue maxWidth: ', maxWidth.value)
})

const progressColor = percent => {
  if (config.value.unit !== '%') {
    return themeVars.value.infoColor
  }
  if (percent <= 50) {
    return themeVars.value.successColor
  } else if (percent > 50 && percent < 80) {
    return themeVars.value.warningColor
  } else {
    return themeVars.value.errorColor
  }
}
</script>

<template>
  <div w-full h-full flex justify-center items-center>
    <div class="loadBox" w-full h-full c-coolgray-300 p-20px m-10px>
      <div
        class="load-info-box"
        h-full
        flex
        flex-col
        justify-center
        items-center
      >
        <div
          class="load-info-item"
          flex-1
          w-full
          v-for="item in getSortedData(data)"
          :key="item.name"
        >
          <div flex justify-between items-center>
            <div
              class="load-info-item-title text-14px mr-15"
              :style="{ width: maxWidth }"
            >
              {{ item.name }}
            </div>
            <div
              class="load-info-item-content flex justify-between items-center"
              :style="{ width: `calc(100% - ${maxWidth})` }"
            >
              <div class="progress-box mr-10">
                <n-progress
                  type="line"
                  :color="progressColor(item.percent)"
                  rail-color="#003663"
                  :percentage="item.percent"
                  indicator-text-color="#ffffffc7"
                  :show-indicator="false"
                  :height="12"
                ></n-progress>
              </div>
              <div>
                <span
                  text-13px
                  w-full
                  :style="{ color: progressColor(item.percent) }"
                >
                  {{
                    config.unit !== '%'
                      ? item.number + config.unit
                      : item.percent + config.unit
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-box {
  width: 100%;
  margin-right: 20px;
}
</style>
