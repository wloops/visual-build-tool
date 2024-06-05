<script setup>
import IconCol from '~icons/fluent/layout-column-three-20-filled'
import IconRow from '~icons/fluent/layout-row-three-16-filled'
import IconGrid from '~icons/fluent/layout-column-two-split-right-16-filled'
import { useMaterialStore } from '@/stores/material'

const materialStore = useMaterialStore()
const layoutModels = ref([
  {
    name: '列式布局',
    id: 'column',
    icon: IconCol,
    desc: 'This is the first layout',
  },
  {
    name: '行式布局',
    id: 'row',
    icon: IconRow,
    desc: 'This is the first layout',
  },
  {
    name: '网格式布局',
    id: 'grid',
    icon: IconGrid,
    desc: 'This is the first layout',
  },
])

const layout = ref('column')
const layoutIcon = ref(layoutModels.value[0].icon)

const handleLayoutChange = (e) => {
  console.log(e)
  layout.value = e
  layoutIcon.value = layoutModels.value.find((item) => item.id === e).icon
  materialStore.switchLayout(e)
}
</script>

<template>
  <div>
    <a-radio-group v-model="layout" @change="handleLayoutChange" w-full>
      <template v-for="item in layoutModels" :key="item.id" w-full>
        <a-radio :value="item.id">
          <template #radio="{ checked }">
            <a-space align="start" class="custom-radio-card" :class="{ 'custom-radio-card-checked': checked }">
              <div className="custom-radio-card-mask">
                <div className="custom-radio-card-mask-dot" />
              </div>
              <div>
                <div className="custom-radio-card-title">
                  {{ item.name }}
                </div>
                <a-typography-text type="secondary">
                  {{ item.desc }}
                </a-typography-text>
              </div>
            </a-space>
          </template>
        </a-radio>
      </template>
    </a-radio-group>
    <div w-full>
      <component :is="layoutIcon" class="text-100px"></component>
    </div>
  </div>
</template>


<style scoped>
.custom-radio-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
}

.custom-radio-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-radio-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 100%;
}

.custom-radio-card-title {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.custom-radio-card:hover,
.custom-radio-card-checked,
.custom-radio-card:hover .custom-radio-card-mask,
.custom-radio-card-checked .custom-radio-card-mask {
  border-color: rgb(var(--primary-6));
}

.custom-radio-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-radio-card:hover .custom-radio-card-title,
.custom-radio-card-checked .custom-radio-card-title {
  color: rgb(var(--primary-6));
}

.custom-radio-card-checked .custom-radio-card-mask-dot {
  background-color: rgb(var(--primary-6));
}
</style>
