<script lang="ts" setup>
import {v4 as uuid} from 'uuid';

defineProps({
  label: {
    type: String
  },
  id: {
    type: String,
    default: uuid()
  },
  placeholder: {
    type: String,
  },
  icon: {
    type: String,
  },
  type: {
    type: String,
    default: 'text'
  }
})

const model = defineModel();
</script>

<template>
  <label :for="id" class="flex flex-col gap-2 relative">
    {{ label }}
    <span v-if="icon" class="material-symbols-outlined absolute top-1/2 -translate-y-1/2 left-3 text-neutral-500">
      {{ icon }}
    </span>
    <input :id="id"
           v-model="model"
           :placeholder="placeholder"
           :class="{'pl-8': icon}"
           class="input h-10 border border-wb-primary-border inline-flex content-center px-2 rounded placeholder-neutral-500"
           :type="type">
  </label>
</template>

<style lang="scss" scoped>
.input {
  transition: 100ms all;

  &:hover {
    border-color: theme('colors.neutral.400');
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px theme('colors.neutral.200');
  }
}
</style>