<script setup lang="ts">
import {useScheduleStore} from "@/stores/schedule.store";
import {storeToRefs} from "pinia";
import CalendarElement from "@/components/schedule/CalendarElement.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const scheduleStore = useScheduleStore();
const {schedule} = storeToRefs(scheduleStore)

function addDayPart(inFront: boolean): void {
  scheduleStore.addDayPart(inFront);
}
</script>

<template>
  <div class="my-8 flex flex-col items-center gap-16">
    <BaseButton @click="addDayPart(true)">Add</BaseButton>
    <div class="flex flex-col items-center gap-2 w-full">
      <CalendarElement v-for="dayPart in schedule.dayParts" :day-part="dayPart"></CalendarElement>
    </div>
    <BaseButton @click="addDayPart(false)">Add</BaseButton>
  </div>
</template>

<style scoped lang="scss">

</style>