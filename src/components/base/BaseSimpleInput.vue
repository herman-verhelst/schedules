<script setup>
defineProps({
  placeholder: {
    type: String
  },
})

const model = defineModel();
</script>

<template>
  <input
      v-model="model"
      type="text"
      :placeholder="placeholder"
      class="text-base outline-none text-grayscale-100 placeholder:text-grayscale-80 w-full"/>
</template>

<style scoped lang="scss">

</style>