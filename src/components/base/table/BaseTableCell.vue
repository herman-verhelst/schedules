<script setup>
defineProps({
  fitWidth: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
<td :class="{'w-1 no-wrap': fitWidth}" class="text-base text-left pt-4 pb-2 pl-1 pr-4 max-h-12 border-b border-grayscale-20">
  <slot></slot>
</td>
</template>

<style scoped lang="scss">

</style>