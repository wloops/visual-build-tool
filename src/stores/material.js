/*
 * @Description: Material store
 */
export const useMaterialStore = defineStore('material', () => {
  const materialLayout = ref(null)
  const layoutParams = ref({})
  // 初始化
  const initModel = () => {
    materialLayout.value = 'column'
  }

  // 切换布局
  const switchLayout = (layout) => {
    materialLayout.value = layout
  }

  // 设置布局参数
  const setLayoutParams = (params) => {
    layoutParams.value = params
  }


  // 监听布局变化
  watch(materialLayout, (newVal, oldVal) => {
    console.log('materialLayout changed', newVal, oldVal)
  })

  // 初始化

  initModel()
  return {
    materialLayout,
    switchLayout,
    layoutParams,
    setLayoutParams
  }
})
