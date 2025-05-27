<script setup lang="ts">

import BaseTitle from "@/components/base/BaseTitle.vue";
import BaseDialogClose from "@/components/base/dialog/BaseDialogClose.vue";

const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}
</script>

<template>
  <div class="flex items-center justify-between p-6">
    <div class="flex flex-col gap-1">
      <slot></slot>
    </div>
    <BaseDialogClose @click="closeModal"></BaseDialogClose>
  </div>
</template>

<style scoped lang="scss">

</style>