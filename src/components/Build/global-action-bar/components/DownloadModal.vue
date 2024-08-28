<script setup>
import { useClipboard } from '@vueuse/core'
const { text, copy, copied, isSupported } = useClipboard()

const visible = ref(false)
const json = ref('')

const show = data => {
  console.log(data)
  json.value = JSON.stringify(data, null, 4)
  visible.value = true
}
const handleBeforeOk = done => {
  copy(json.value)
  window.setTimeout(() => {
    AMessage.success('复制成功')
    done()
    // prevent close
    // done(false)
  }, 0)
}
const handleCancel = () => {
  visible.value = false
}

defineExpose({
  show
})
</script>

<template>
  <div>
    <a-modal
      v-model:visible="visible"
      title="Download Layout Data"
      okText="复制"
      width="50%"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-textarea
        placeholder="Please enter something"
        :auto-size="{ minRows: 4, maxRows: 15 }"
        :model-value="json"
      />
    </a-modal>
  </div>
</template>

<style scoped></style>
