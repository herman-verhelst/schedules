<script setup lang="ts">
import {v4 as uuid} from 'uuid'

defineProps({
  label: {
    type: String,
  },
  description: {
    type: String,
  },
  error: {
    type: String,
  },
  placeholder: {
    type: String
  },
  id: {
    type: String,
    default: uuid()
  },
  type: {
    type: String,
    default: 'text',
    validator: (value: string, props): boolean => ['text', 'number', 'time'].includes(value)
  }
})

const model = defineModel();
</script>

<template>
  <div class="flex-col flex gap-2">
    <div class="flex flex-col gap-1">
      <label class="text-base" v-if="label" :for="id">{{ label }}</label>
      <p v-if="description" class="text-sm text-grayscale-80">{{ description }}</p>
    </div>
    <input
        v-model="model"
        class="text-base border px-2 h-7 border-grayscale-20 rounded-sm w-full hover:border-grayscale-50 focus:border-electric-indigo-100 focus:ring focus:ring-2 focus:ring-electric-indigo-opacity-40 outline-none"
        :class="{'tabular-nums': type === 'time' || 'number'}"
        :type="type"
        :placeholder="placeholder"
        :id="id">
    <p v-if="error" class="text-sm text-grayscale-80">{{ error }}</p>
  </div>

</template>

<style scoped lang="scss">

</style>