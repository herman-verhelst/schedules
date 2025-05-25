<script setup lang="ts">
import {ref, onMounted} from 'vue';

const dialogFooter = ref<HTMLDivElement | null>(null);
const isSingleChild = ref(false);

onMounted(() => {
  if (dialogFooter.value) {
    const childCount = dialogFooter.value.children.length;
    isSingleChild.value = childCount === 1;
  }
});
</script>

<template>
  <div
      class="flex items-center p-4"
      :class="{'justify-end': isSingleChild, 'justify-between': !isSingleChild}"
      ref="dialogFooter"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">

</style>