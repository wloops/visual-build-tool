<script setup>
import { useMaterialStore } from '@/stores/material'
import { useSelectBoxStore } from '@/stores/selectBox'
import { ref } from 'vue';

const materialStore = useMaterialStore()
const selectBoxStore = useSelectBoxStore()
const props = defineProps({
  canvasLayoutData: {
    type: Object,
    default: () => { }
  }
})

// 排版方式 分列/分行/独立网格
let layoutModel = ref('column') // 'row'|'column'|'grid'

const layoutData = ref([])

watch(
  () => materialStore.materialLayout,
  newVal => {
    layoutModel.value = newVal
  }
)

watch(
  () => props.canvasLayoutData.list,
  (newValue, oldValue) => {
    // 当props的数据发生变化时，执行相应的逻辑
    console.log('canvasLayoutData的值发生了变化：', newValue)
    console.log('layoutModel:', layoutModel.value)
    // layoutModel.value = newValue.direction
    layoutData.value = newValue
    // selectBoxStore.setSelectBox(null)
  },
  {
    deep: true
  }
)
// watchEffect(() => {
//   layoutData.value = props.canvasLayoutData.list
// })

const activeID = ref('')
function selectBox(box) {
  const childBoxs = document.querySelectorAll('.childBox')
  childBoxs.forEach(item => {
    console.log('item.value', item.getAttribute('value'))
    let value = item.getAttribute('value')
    if (value === box.id) {
      // box.actived = true
      item.classList.add('actived')
    } else {
      // box.actived = false
      item.classList.remove('actived')
    }
  })

  // if (activeID.value === box.id) {
  //   activeID.value = ''
  //   box.actived = false
  //   console.log('取消选择box：', box);
  //   // 清除选中样式
  //   const activedBoxs = document.querySelectorAll('.actived')
  //   activedBoxs.forEach(box1 => {
  //     box1.classList.remove('actived')
  //   })
  // } else {
  //   box.actived = true
  //   activeID.value = box.id
  // }
  box.actived = true
  console.log('选择了box：', box)
  console.log('box:', document.getElementById(box.id))

  selectBoxStore.setSelectBox(box)
}

// watchEffect(() => {
//   activeID.value = selectBoxStore.selectedBox && selectBoxStore.selectedBox.actived
// })
</script>

<template>
  <div id="canvas-main" text-coolGray-300 w-full h-full>
    <div :class="{
      'column-wrap': layoutModel === 'column',
      'row-wrap': layoutModel === 'row',
      'grid-wrap': layoutModel === 'grid'
    }" w-full h-full pr-3 pb-3>
      <div v-for="(item, index) in layoutData" :key="index" :class="{ 'flex-col': layoutModel === 'column' }" w-full
        h-full flex justify-center items-center m-2 :style="`flex: ${item.flexRatio};`">
        <div v-for="(innerBox, innerIndex) in item.innerBoxs" :key="innerIndex" :style="`flex: ${innerBox.flexRatio};`"
          class="innerBox" :class="{ 'flex-col': innerBox.direction !== 'column' }" w-full h-full flex justify-center
          items-center m-2>
          <div class="childBox" w-full h-full v-for="(child, childIndex) in innerBox.children"
            :style="`flex: ${child.flexRatio};`" :value="child.id" @click="selectBox(child)">
            <CommonChart :layoutData="child"></CommonChart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.innerBox {
  border: 1px dashed #4c525558;
  /* cursor: pointer; */
  /* 鼠标悬浮高亮 */
  /* transition: all 0.3s ease-in-out; */
  /* padding: 10px; */
}

.childBox {
  border: 1px dashed #1997eb;
  cursor: pointer;
  /* 鼠标悬浮高亮 */
  transition: all 0.3s ease-in-out;
}

.childBox:hover {
  border: 2px dashed #2ec23c;
}

.childBox:active {
  border: 2px dashed #2ec23c;
}

.actived {
  border: 2px dashed #2ec23c;
}

.column-wrap {
  @apply flex flex-row justify-center items-center;
}

.row-wrap {
  @apply flex flex-col justify-center items-center;
}

.grid-wrap {
  @apply flex flex-wrap justify-center items-center;
}

.flex-col {
  @apply flex-col;
}
</style>
