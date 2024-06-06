/*
 * @Description: selcctBox store
 */
export const useSelectBoxStore = defineStore('selectBox', () => {
  const selectedBox = ref(null)
  const setSelectBox = (value) => {
    selectedBox.value = value
  }
  const clearSelectedBox = () => {
    selectedBox.value = null
  }
  return {
    selectedBox,
    setSelectBox,
    clearSelectedBox
  }
})
