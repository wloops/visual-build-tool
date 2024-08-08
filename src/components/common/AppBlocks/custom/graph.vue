<script setup>
const props = defineProps({
  // config: {
  //   type: Object,
  //   required: true
  // },
  data: {
    type: Array,
    default: () => []
  }
})
const config = {
  type: "chart|graph",
  flexRatio: 5,
  request: {
    mode: "ws",
    params: {
      wsId: "tpsTrend",
      groupId: 'SJJ1310-HSM-02',
      itemId: 'tpsTrend',
    }
  }
}
</script>

<template>
  <div>
    <chart :config="config" :data="data"></chart>
  </div>
</template>


<style scoped></style>
