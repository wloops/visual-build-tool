<script setup>
import { h } from 'vue';

const emit = defineEmits(['callback'])
const visible = ref(false)

const posts = ref({})
const open = (data) => {
  form.ratioList = []
  for (let index = 0; index < data.colNum; index++) {
    form.ratioList.push(1)
  }
  console.log('form.ratioList:', form.ratioList)
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

const setLayoutLabel = (model) => {
  switch (model) {
    case 'column':
      return '高度'
    case 'row':
      return '宽度'
    default:
      return '栅格数'
  }
}

const handSetFlexRatio = (value, rowIndex, colIndex) => {
  form.ratioList[colIndex] = value
  emit('callback', value, rowIndex, colIndex)
}
const getPercent = (index) => {
  // 根据flex比例算百分比,保留两位小数
  const value = form.ratioList[index]
  return ((value / form.ratioList.reduce((acc, cur) => acc + cur, 0)) * 100).toFixed(2) + '%'
}


// 暴露方法
defineExpose({
  open
});

</script>

<template>
  <div>
    <a-drawer width="100%" popup-container="#parentNode" :visible="visible" ok-text="返回" hide-cancel
      @cancel="handleCancel" @ok="handleCancel">
      <template #title> {{ `第${posts.index + 1}列区块设置` }} </template>
      <a-form :model="form" :style="{ width: '100%' }" layout="vertical">
        <div v-for="(item, index) in posts.colNum">
          <h4>{{ '区块' + (index + 1) }}</h4>
          <a-form-item :label="setLayoutLabel(posts.model)" validate-trigger="input">
            <a-input-number placeholder="Please Enter" :default-value="1" mode="button" class="input-demo" :min="1"
              :disabled="posts.colNum === 1" @change="handSetFlexRatio($event, posts.index, index)" />
            <template #extra>
              <div>{{ getPercent(index) }}</div>
            </template>
          </a-form-item>
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
