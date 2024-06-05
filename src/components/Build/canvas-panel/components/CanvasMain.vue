<script setup>
import { useMaterialStore } from '@/stores/material'
import { useSelectBoxStore } from '@/stores/selectBox'

const materialStore = useMaterialStore()
const selectBoxStore = useSelectBoxStore()
const props = defineProps({
  canvasLayoutData: {
    type: Object,
    default: () => { },
  },
})

// 排版方式 分列/分行/独立网格
let layoutModel = ref('column') // 'row'|'column'|'grid'



const layoutData = ref([
  {
    name: 'A01',
    height: 'auto', // 'auto'|'100px'
    direction: 'column', // ''|'row'|'column'
    innerBoxs: [
      {
        name: 'A01-01',
        height: 'auto',
        direction: '',
      }
    ]
  },
  {
    name: 'A01',
    height: 'auto', // 'auto'|'100px'
    direction: 'column', // ''|'row'|'column'
    innerBoxs: [
      {
        name: 'A01-01',
        height: 'auto',
        direction: '',
      }
    ]
  },
  {
    name: 'A02',
    height: 'auto', // 'auto'|'100px'
    direction: 'column', // ''|'row'|'column'
    innerBoxs: [
      {
        name: 'A01-01',
        height: 'auto',
        direction: '',
      }
    ]
  }
])


watch(
  () => materialStore.materialLayout,
  (newVal) => {
    layoutModel.value = newVal
  }
)
watch(() => props.canvasLayoutData, (newValue, oldValue) => {
  // 当props的数据发生变化时，执行相应的逻辑
  console.log('canvasLayoutData的值发生了变化：', newValue);
  layoutModel.value = newValue.direction
  switch (layoutModel.value) {
    case 'column':
      layoutData.value = newValue.list
      break;


    default:
      break;
  }
}, {
  deep: true,
})

const activeID = ref('')
function selectBox(box) {
  if (activeID.value === box.id) {
    activeID.value = ''
    box.actived = false
    console.log('取消选择box：', box);
  } else {
    box.actived = true
    activeID.value = box.id
    console.log('选择了box：', box);
  }
  selectBoxStore.setSelectBox(box)
}

watch(() => activeID.value, (newValue, oldValue) => {
  // 当activeID的值发生变化时，执行相应的逻辑
  if (activeID.value !== '') {

  }
})

</script>

<template>
  <div id="canvas-main" text-coolGray-300 w-full h-full>
    <div
      :class="{ 'column-wrap': layoutModel === 'column', 'row-wrap': layoutModel === 'row', 'grid-wrap': layoutModel === 'grid' }"
      w-full h-full pl-3 pr-3 pb-3>

      <div v-for="(item, index) in layoutData" :key="index" w-full h-full flex flex-col justify-center items-center m-3>
        <div v-for="(innerBox, innerIndex) in item.innerBoxs" :key="innerIndex"
          :class="{ 'innerBox': true, 'actived': activeID === innerBox.id }" flex-1 w-full m-3
          @click="selectBox(innerBox)">
          <div class="innerBox-content" w-full h-full :id="innerBox.id"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.innerBox {
  border: 1px dashed #76c1f3;
  cursor: pointer;
  /* 鼠标悬浮高亮 */
  transition: all 0.3s ease-in-out;
}

.innerBox:hover {
  border: 3px dashed #76c1f3;
}

.actived {
  border: 3px dashed #2EC23C;
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
</style>