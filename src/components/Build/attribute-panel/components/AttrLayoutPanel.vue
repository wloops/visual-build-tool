<script setup>
import { v4 as uuidv4 } from 'uuid'
import { useMaterialStore } from '@/stores/material'
import { useSelectBoxStore } from '@/stores/selectBox'
import { nextTick } from 'vue'
import OtherSetting from './OtherSetting.vue'

const materialStore = useMaterialStore()
const selectBoxStore = useSelectBoxStore()
const props = defineProps({
  model: {
    type: Object
  }
})
const emit = defineEmits(['callback'])

const layoutModel = ref(materialStore.materialLayout)

watch(
  () => materialStore.materialLayout,
  newVal => {
    layoutModel.value = newVal
  }
)

const form = reactive({
  key: layoutModel.value,
  posts: [
    {
      id: 1,
      value: 1
    }
  ]
})

const layoutParams = ref({
  key: new Date().getTime(),
  // direction: layoutModel.value,
  list: []
})

const colNum = ref(3) // 默认3列

const handAddList = ratio => {
  layoutParams.value.key = new Date().getTime()
  layoutParams.value.list.push({
    name: `${layoutModel.value}-` + (layoutParams.value.list.length + 1),
    direction: 'column',
    flexRatio: ratio ? ratio : 1,
    innerBoxs: [
      {
        name: '',
        direction: 'column'
      }
    ]
  })

  console.log('handAddList', layoutParams.value)
}

const handSetFlexRatio = (ratio, index) => {
  layoutParams.value.list[index].flexRatio = ratio
}
const handSetFlexRatio2 = (ratio, index, innerIndex, type) => {
  if (type && type === 'direction') {
    layoutParams.value.list[index].innerBoxs[innerIndex].direction = ratio
      ? 'row'
      : 'column'
  } else {
    layoutParams.value.list[index].innerBoxs[innerIndex].flexRatio = ratio
  }
  console.log('handSetFlexRatio2', layoutParams.value)
}
const handSetFlexRatio3 = (ratio, index, innerIndex, childIndex) => {
  if (childIndex !== -1) {
    layoutParams.value.list[index].innerBoxs[innerIndex].children[
      childIndex
    ].flexRatio = ratio
  } else {
    if (
      layoutParams.value.list[index].innerBoxs[innerIndex].children.length !==
      ratio
    ) {
      layoutParams.value.list[index].innerBoxs[innerIndex].children = []
      for (let i = 0; i < ratio; i++) {
        layoutParams.value.list[index].innerBoxs[innerIndex].children.push({
          id: 'block-child-id-' + uuidv4(),
          fatherID: layoutParams.value.list[index].innerBoxs[innerIndex].id,
          flexRatio: 1
        })
      }
    }
  }
  console.log('handSetFlexRatio3', ratio, layoutParams.value)
}

const handAddInnerBoxs = async index => {
  layoutParams.value.key = new Date().getTime()
  const f_id = 'block-id-' + uuidv4()
  layoutParams.value.list[index].innerBoxs.push({
    id: f_id,
    name:
      '第' +
      (index + 1) +
      setLayoutLabel(layoutModel.value, 1) +
      '区块' +
      (layoutParams.value.list[index].innerBoxs.length + 1),
    flexRatio: 1,
    direction: 'column',
    children: [
      {
        id: 'block-child-id-' + uuidv4(),
        fatherID: f_id,
        flexRatio: 1
      }
    ]
  })

  console.log('handAddInnerBoxs', layoutParams.value)
}
const handleAdd = async value => {
  console.log('handleAdd')
  form.posts.push({
    id: form.posts.length + 1,
    flexRatio: 1,
    value: value ? value : 1
  })
}

const handleDelete = index => {
  form.posts.splice(index, 1)
}

const setinnerBoxs = async (value, index) => {
  console.log('setinnerBoxs', value, index)
  // 先清空
  layoutParams.value.list[index].innerBoxs = []
  for (let i = 0; i < value; i++) {
    await handAddInnerBoxs(index)
  }

  await emit('callback', layoutParams.value)
  // 存储在pinia中
  materialStore.setLayoutParams(layoutParams.value)
}

// 初始化
const show = ref(false)
const init = async () => {
  if (
    Object.values(materialStore.layoutParams).length > 0 &&
    materialStore.layoutParams.list.length === colNum.value
  ) {
    layoutParams.value = materialStore.layoutParams
    console.log('init layoutParams.value', layoutParams.value)
    nextTick(() => {
      form.posts = []
      layoutParams.value.list.forEach((item, index) => {
        handleAdd(item.innerBoxs.length)
      })
      show.value = true
    })
    return
  }
  form.posts = []
  layoutParams.value.list = []
  for (let index = 0; index < colNum.value; index++) {
    console.log('index::', index)
    await handleAdd()
    await handAddList()
    await setinnerBoxs(1, index)
  }
  await emit('callback', layoutParams.value)
  // 存储在pinia中
  materialStore.setLayoutParams(layoutParams.value)
  nextTick(() => {
    show.value = true
  })
}

init()

const setPosts = value => {
  colNum.value = value
  init()
}

const setLayoutLabel = (model, i) => {
  switch (model) {
    case 'column':
      return i === 1 ? '列' : '宽度'
    case 'row':
      return i === 1 ? '行' : '高度'
    default:
      return '栅格数'
  }
}

const otherSetting = ref(null)
const openOtherSetting = index => {
  const data = {
    model: props.model,
    index,
    colNum: layoutParams.value.list[index].innerBoxs.length,
    innerBoxs: layoutParams.value.list[index].innerBoxs
  }
  console.log('openOtherSetting', data)
  otherSetting.value.open(data)
}
const getPercent = index => {
  if (!layoutParams.value?.list[index]) return ''
  // 根据flex比例算百分比,保留两位小数
  console.log('getPercent', index, layoutParams.value?.list[index])
  const value = layoutParams.value?.list[index].flexRatio
  const ratioList = layoutParams.value.list.map(item => item.flexRatio)
  return (
    ((value / ratioList.reduce((acc, cur) => acc + cur, 0)) * 100).toFixed(2) +
    '%'
  )
}

watchEffect(() => {
  // 存储在pinia中
  materialStore.setLayoutParams(layoutParams.value)
  console.log('watchEffect', layoutParams.value)
})
</script>

<template>
  <div pl-2 pr-2 id="parentNode">
    <a-form :model="form" layout="vertical" v-if="show">
      <a-form-item field="colNum" :label="setLayoutLabel(model, 1) + '数'">
        <a-input-number
          placeholder="Please Enter"
          :default-value="colNum"
          mode="button"
          class="input-demo"
          @change="setPosts"
          :min="2"
          :max="5"
        />
      </a-form-item>
      <div v-for="(post, index) of form.posts">
        <!-- <a-form-item :field="`posts[${index}].value`" :label="`第${index + 1}列布局参数`" :key="index">
        </a-form-item> -->
        <h4>{{ `第${index + 1}${setLayoutLabel(model, 1)}布局参数` }}</h4>
        <a-form-item>
          <a-form-item :label="setLayoutLabel(model, 2)" mr-2>
            <a-input-number
              placeholder="Please Enter"
              :default-value="post.value"
              mode="button"
              class="input-demo"
              :min="1"
              @change="handSetFlexRatio($event, index)"
            ></a-input-number>
            <template #extra>
              <div>{{ getPercent(index) }}</div>
            </template>
          </a-form-item>
          <!-- <a-form-item label="边框" mr-2>
            <a-input-number placeholder="Please Enter" :default-value="post.value" mode="button" class="input-demo"
              :min="1" @change="handSetFlexRatio($event, index)"></a-input-number>
            <template #extra>
              <div>{{ 1 }}px</div>
            </template>
          </a-form-item> -->
        </a-form-item>
        <a-form-item label="区块数">
          <a-input-number
            placeholder="Please Enter"
            :default-value="post.value"
            mode="button"
            class="input-demo"
            :min="1"
            :max="5"
            @change="setinnerBoxs($event, index)"
          />
          <a-button
            @click="openOtherSetting(index)"
            :style="{ marginLeft: '10px' }"
            >块设置</a-button
          >
        </a-form-item>
      </div>
    </a-form>

    <OtherSetting
      ref="otherSetting"
      @callback="handSetFlexRatio2"
      @callback2="handSetFlexRatio3"
    ></OtherSetting>
  </div>
</template>

<style scoped>
.arco-form-item {
  margin-bottom: 5px;
}
</style>
