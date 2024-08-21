<script setup>
const emit = defineEmits(['callback', 'callback2'])
const visible = ref(false)

const posts = ref({})
const open = data => {
  posts.value = {}
  form.ratioList = []
  data.innerBoxs.forEach(item => {
    form.ratioList.push(item.flexRatio)
  })
  // for (let index = 0; index < data.colNum; index++) {
  //   form.ratioList.push(1)
  // }
  console.log('form.ratioList:', form.ratioList, data)
  posts.value = data
  visible.value = true
}
const handleOk = () => {
  visible.value = false
}
const handleCancel = () => {
  visible.value = false
}

const form = reactive({
  ratioList: []
})

const setLayoutLabel = model => {
  switch (model) {
    case 'column':
      return '高度'
    case 'row':
      return '宽度'
    default:
      return '栅格数'
  }
}

const handSetFlexRatio = (value, rowIndex, colIndex, type) => {
  if (type && type === 'direction') {
    emit('callback', value, rowIndex, colIndex, type)
  } else {
    form.ratioList[colIndex] = value
    emit('callback', value, rowIndex, colIndex)
  }
}
const setinnerBoxChildren = (value, rowIndex, colIndex, childIndex) => {
  emit('callback2', value, rowIndex, colIndex, childIndex)
}
const getPercent = index => {
  // 根据flex比例算百分比,保留两位小数
  const value = form.ratioList[index]
  return (
    ((value / form.ratioList.reduce((acc, cur) => acc + cur, 0)) * 100).toFixed(
      2
    ) + '%'
  )
}

const selectBorder = index => {
  console.log('selectBorder:', index)
}

const borderList = [
  {
    label: '无边框',
    src: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp'
  },
  {
    label: '有边框',
    src: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp'
  },
  {
    label: '内边框',
    src: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp'
  },
  {
    label: '外边框',
    src: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp'
  }
]

// 暴露方法
defineExpose({
  open
})
</script>

<template>
  <div>
    <a-drawer
      width="100%"
      popup-container="#parentNode"
      :visible="visible"
      ok-text="返回"
      hide-cancel
      @cancel="handleCancel"
      @ok="handleCancel"
    >
      <template #title> {{ `第${posts.index + 1}列区块设置` }} </template>
      <a-form :model="form" :style="{ width: '100%' }" layout="vertical">
        <div v-for="(item, index) in posts.innerBoxs">
          <div flex mt-5 mb-5>
            <a-input
              size="small"
              :placeholder="'区块' + (index + 1)"
              v-model="item.name"
            >
            </a-input>
          </div>
          <a-form-item
            :label="setLayoutLabel(posts.model)"
            validate-trigger="input"
          >
            <a-input-number
              size="small"
              placeholder="Please Enter"
              :model-value="item.flexRatio"
              mode="button"
              class="input-demo"
              :min="1"
              :disabled="posts.colNum === 1"
              @change="handSetFlexRatio($event, posts.index, index)"
            />
            <template #extra>
              <div>{{ getPercent(index) }}</div>
            </template>
          </a-form-item>
          <a-form-item label="子区块数">
            <a-input-number
              size="small"
              placeholder="Please Enter"
              :model-value="item.children.length"
              mode="button"
              class="input-demo"
              :min="1"
              :max="5"
              @change="setinnerBoxChildren($event, posts.index, index, -1)"
            />
          </a-form-item>
          <div>
            <a-form-item label="子区块设置">
              <div bg-blueGray-100 p-2>
                <a-space mb-2>
                  <div w-20>纵向排布</div>
                  <a-switch
                    type="line"
                    :model-value="item.direction !== 'column'"
                    @change="
                      handSetFlexRatio($event, posts.index, index, 'direction')
                    "
                  />
                </a-space>
                <a-space v-for="(child, i) in item.children" :key="i">
                  <div w-20>
                    {{
                      `子区块${i + 1}${
                        item.direction === 'column' ? '宽度' : '高度'
                      }`
                    }}
                  </div>
                  <a-input-number
                    size="small"
                    placeholder="Please Enter"
                    :model-value="child.flexRatio"
                    class="input-demo"
                    :min="1"
                    :max="5"
                    @change="setinnerBoxChildren($event, posts.index, index, i)"
                  />
                </a-space>
              </div>
            </a-form-item>
          </div>
          <!-- <a-form-item label="边框" validate-trigger="input">
            <a-popconfirm okText="" cancelText="No" position="tr">
              <a-button>选择边框</a-button>
              <template #content>
                <div>
                  <a-image-preview-group infinite>
                    <a-space v-for="(item, index) in borderList" :key="index">
                      <div class="border-box" flex flex-col justify-center align-center mr-2>
                        <a-image @click="selectBorder(index)" class="border-image" :src="item.src" width="200" />
                        <a-button type="primary" class="border-button">选择</a-button>
                      </div>

                    </a-space>
                  </a-image-preview-group>
                </div>
              </template>
            </a-popconfirm>
          </a-form-item> -->
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>

<style scoped>
.arco-form-item {
  margin-bottom: 5px;
  position: relative;
}

.border-box {
  .border-button {
    margin-top: 2px;
    /* 默认隐藏,占位 */

    display: none;
    position: absolute;
    bottom: 0;
  }
}

.border-box:hover .border-button {
  display: block;
  /* 动画效果 */
}

.border-image {
  cursor: pointer;
}
</style>
