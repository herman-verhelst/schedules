<script setup>
import BaseButton from "../components/base/BaseButton.vue";

</script>

<template>
  <main class="p-2">
    <h1 class="text-xl">Components</h1>
    <div>
      <h2>Buttons</h2>
      <div class="flex flex-col gap-2">
        <h3>Style</h3>
        <BaseButton text="Primary" variant="primary"></BaseButton>
        <BaseButton text="Default" variant="default"></BaseButton>
        <BaseButton text="Subtle" variant="subtle"></BaseButton>
      </div>

      <div class="flex flex-col gap-2">
        <h3>Size</h3>
        <BaseButton text="Medium" size="m"></BaseButton>
        <BaseButton text="Small" size="s"></BaseButton>
        <BaseButton text="X Small" size="xs"></BaseButton>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>