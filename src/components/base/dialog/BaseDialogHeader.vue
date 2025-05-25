<script setup lang="ts">

import BaseTitle from "@/components/base/BaseTitle.vue";
import BaseDialogClose from "@/components/base/dialog/BaseDialogClose.vue";

import {defineEmits} from "vue";

const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}
</script>

<template>
  <div class="flex items-center justify-between p-4">
    <slot></slot>
    <BaseDialogClose @click="closeModal"></BaseDialogClose>
  </div>
</template>

<style scoped lang="scss">

</style>