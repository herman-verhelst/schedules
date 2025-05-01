<script setup lang="ts">
import {computed, reactive} from "vue";

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value: string, props) => ['medium', 'large', 'small'].includes(value)
  },
  grey: {
    type: Boolean,
    default: false,
  },
  bold: {
    type: Boolean,
    default: false,
  },

})

const textClasses = computed(() => ({
  size: props.size === 'small' ? 'text-sm' : props.size === 'large' ? 'text-lg' : 'text-base',
  color: props.grey ? 'text-grayscale-80' : 'text-grayscale-100',
  bold: props.bold ? 'font-bold' : 'font-normal'
}))

</script>

<template>
  <p :class="[textClasses.bold, textClasses.color, textClasses.size]">
    <slot></slot>
  </p>
</template>

<style scoped lang="scss">

</style>