<script setup>
import {useAttrs} from "vue";

defineProps({
  fullWidth: {
    type: Boolean,
    default: false
  }
});

const attrs = useAttrs()

</script>

<template>
<th v-bind="attrs" :class="{'w-full': fullWidth}"  class="text-sm text-grayscale-80 text-left py-2 pl-1 pr-4">
  <slot></slot>
</th>
</template>

<style scoped lang="scss">

</style>