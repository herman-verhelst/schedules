<script setup lang="ts">
import {useAttrs} from "vue";

const attrs = useAttrs()
</script>

<template>
<div v-bind="attrs" class="px-4">
  <slot></slot>
</div>
</template>

<style scoped lang="scss">

</style>