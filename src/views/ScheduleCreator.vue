<script setup>
import DayPart from "@/components/schedule/DayPart.vue";
import Calendar from "@/components/schedule/Calendar.vue";

</script>

<template>
  <div class="flex px-8 gap-8 border border-grayscale-20 rounded-sm bg-grayscale-5 h-full">
    <Calendar class="w-full"></Calendar>
    <div class="h-full w-[1px] bg-grayscale-20"></div>
    <DayPart class="w-full"></DayPart>
  </div>
</template>

<style scoped lang="scss">

</style>