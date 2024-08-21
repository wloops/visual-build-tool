<script setup>
import { ref } from 'vue'
// import { useWebSocket } from '@/hooks'
// import { useMonitorStore } from '@/store'
// import { useProceResponseData } from '@/hooks/useProceResponseData'

import { useSelectBoxStore } from '@/stores/selectBox'

// const materialStore = useMaterialStore()
const selectBoxStore = useSelectBoxStore()

// const store = useMonitorStore()

// const { wsInit, wsSend } = useWebSocket()

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const isApply = ref(false)
const componentKey = ref(0)
const dynamicComponents = reactive({})
const blockTabs = reactive({})

onMounted(async () => {
  const modules = import.meta.glob('@/components/common/AppBlocks/**/*.vue')
  for (const path in modules) {
    const module = await modules[path]()
    const componentName = path.replace(/^\.\/components\/(.*)\.vue$/, '$1')
    // console.log(`componentName`, componentName);
    dynamicComponents[componentName] = markRaw(module.default)
  }
  // console.log(`dynamicComponents`, dynamicComponents);

  for (const key in dynamicComponents) {
    const component = dynamicComponents[key]
    if (component.__name) {
      // console.log(`component.name`, component.__name);
      blockTabs[component.__name] = component
    }
  }

  console.log('blockTabs::', blockTabs)
})

const requestList = ref([])
const wsMessageList = ref([])

const waitRequestList = item => {
  requestList.value.push(item)
  if (item.request.mode === 'ws') {
    wsMessageList.value.push(item)
  }
}

const blockTopID = ref(`${props.data.id}`)
onMounted(() => {
  isApply.value = false
  console.log('onMounted charts', props.data)

  // const dom0 = document.getElementById('chart-block' + props.data.id)
  // const width = dom0.offsetWidth
  // const height = dom0.offsetHeight
  // 获取宽高
  // const parentElement = document.getElementById(blockTopID.value)
  // console.log('parentElement:', blockTopID.value, parentElement)
  // const width = parentElement.offsetWidth
  // const height = parentElement.offsetHeight

  // props.data.children?.forEach(item => {
  //   item.request && waitRequestList(item)
  //   if (!item.type) return
  //   if (item.type.indexOf('|') > -1 && item.type.split('|')[0] === 'chart') {
  //     // const dom = document.getElementById('chart-' + item.id)
  //     // if (!dom) return
  //     // console.log('dom %:', dom)
  //     // nextTick(() => {
  //     //   init(dom, item.type.split('|')[1], item.chartID)
  //     // })
  //   } else if (item.type === 'infos') {
  //     item.height = item.heightRatio ? height * item.heightRatio + 'px' : height + 'px'
  //   } else if (item.type === 'iconLists') {
  //     item.width = width - 50 + 'px'
  //   }
  // })

  console.log('wsMessageList::', wsMessageList.value)
  // wsMessageList.value.length > 0 && setWsInit()

  isApply.value = true
})

async function handleOpen(e) {
  console.log('WebSocket连接已打开', e, wsMessageList.value)
  const list = wsMessageList.value
  if (list.length > 0) {
    list.forEach(item => {
      const data = {
        groupId: item.request.params.groupId,
        itemId: item.request.params.itemId
      }
      wsSend(data)
    })
  }
}

function setWsInit() {
  wsInit(handleMessage, handleOpen)
}

const componentData = ref({})
function handleMessage(e) {
  const message = JSON.parse(e.data)
  isApply.value = false
  // 新增或更新数据
  // let blockID = ''
  wsMessageList.value.forEach(item => {
    if (
      item.request.mode === 'ws' &&
      item.request.params.groupId === message.groupId &&
      item.request.params.itemId === message.itemId
    ) {
      console.log('WebSocket收到 更新 消息', message)
      // item.data = useProceResponseData(item.request.params.wsId, message.data)
      componentData.value[item.id] = useProceResponseData(
        item.request?.params.wsId,
        message.data
      )
      // store.setComponetData(componentData.value)
      // blockID = item.id
    }
  })

  // 重新渲染组件

  // nextTick(() => {
  //   getWsMsgForID(wsMessageList.value)
  //   console.log('componentData data::', componentData.value)
  // })
  isApply.value = true
}

function getWsMsgForID(list) {
  console.log('getWsMsgForID::', list)
  let data = {}
  if (!list || list.length === 0) return data
  list.forEach(item => {
    // if (item.id === id && item.request.mode === 'ws') {
    data = item.data
    componentData.value[item.id] = item.data
    // }
  })

  console.log('getWsMsgForID data::', data)
  // 改变key来强制重新渲染组件
  componentKey.value++
  // return data
}

const setSpacePercent = (ratio, type) => {
  const notList = ['infos', 'iconLists']
  if ((type && !ratio) || notList.includes(type)) return
  let ratioPlus = 0
  const direction =
    props.data.direction === 'column' ? 'width|height' : 'height|width'
  props.data.children.forEach(innerBox => {
    ratioPlus += innerBox.flexRatio
  })
  const percent = ((ratio / ratioPlus) * 100).toFixed(2)
  console.log('percent::', `${direction.split('|')[0]}: ${percent}%`)
  return `${direction.split('|')[0]}: ${percent}%`
}

const getTypeName = type => {
  if (!type) return
  if (type.indexOf('|') > -1) {
    return type.split('|')[0]
  }
  return type
}

function selectBox(box) {
  const childBoxs = document.querySelectorAll('.childBox')
  childBoxs.forEach(item => {
    console.log('item.value', item.getAttribute('value'))
    let value = item.getAttribute('value')
    if (value === box.id) {
      // box.actived = true
      item.classList.add('actived')
      // 计算获取绑定块的宽高
      // const rect = item.getBoundingClientRect()
      const rect = item
      const width = rect.clientWidth
      const height = rect.clientHeight
      console.log('box 宽高:', item, width, height)
      box.width = width
      box.height = height
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
</script>

<template>
  <div
    w-full
    h-full
    flex
    :id="'app-block-' + props.data.id"
    :class="{ 'flex-col': props.data.direction !== 'column' }"
  >
    <template
      v-for="(item, index) in props.data.children"
      w-full
      h-full
      flex
      justify-center
      items-center
      :id="'group-' + item.id"
      :key="index"
    >
      <div
        v-if="!item.type"
        class="childBox"
        :value="item.id"
        w-full
        h-full
        :style="setSpacePercent(item.flexRatio, item.type)"
        @click="selectBox(item)"
      ></div>
      <component
        v-else
        class="childBox"
        :is="blockTabs[getTypeName(item.type)]"
        :config="item"
        :data="componentData[item.id]"
        :value="item.id"
        :style="setSpacePercent(item.flexRatio, item.type)"
        w-full
        h-full
        @click="selectBox(item)"
      >
      </component>
    </template>
  </div>
</template>

<style scoped>
.flex-col {
  flex-direction: column;
}

.childBox {
  border: 1px dashed #5e7fe1;
  /* border-top: none; */
  border-bottom: none;
  cursor: pointer;
  /* 鼠标悬浮高亮 */
  transition: all 0.3s ease-in-out;
  border-radius: 5px;
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
</style>
