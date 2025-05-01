<script setup lang="ts">
import { useAttrs, computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'h4',
    validator: (value: string) => ['h1', 'h2', 'h3', 'h4'].includes(value),
  },
  grey: {
    type: Boolean,
    default: false,
  },
})

const attrs = useAttrs()

const tag = computed(() => props.size || 'h4')


const textClasses = computed(() => ({
  color: props.grey ? 'text-grayscale-80' : 'text-grayscale-100',
}))

const sizeClasses = {
  h1: 'text-4xl',
  h2: 'text-3xl',
  h3: 'text-2xl',
  h4: 'text-xl',
}
</script>

<template>
  <component
      :is="tag"
      v-bind="attrs"
      :class="[sizeClasses[tag], textClasses.color]"
  >
    <slot />
  </component>
</template>