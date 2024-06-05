/*
 * @Description: selcctBox store
 */
export const useSelectBoxStore = defineStore('selectBox', () => {
  const selectedBox = ref(null)
  const setSelectBox = (value) => {
    selectedBox.value = value
  }
  return {
    selectedBox,
    setSelectBox
  }
})
