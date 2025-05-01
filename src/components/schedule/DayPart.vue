<script setup lang="ts">

import DayPartsEmpty from "@/components/schedule/DayPartsEmpty.vue";
import DayPartEditor from "@/components/schedule/DayPartEditor.vue";
import {computed} from "vue";
import {useScheduleStore} from "@/stores/schedule.store";
import {storeToRefs} from "pinia";

const scheduleStore = useScheduleStore();
const {schedule} = storeToRefs(scheduleStore)
const selectedDayPart = computed(() => schedule.value.dayParts.find((dayPart) => dayPart.selected));
</script>

<template>
  <DayPartsEmpty v-if="!selectedDayPart"></DayPartsEmpty>
  <DayPartEditor v-else :day-part="selectedDayPart"></DayPartEditor>
</template>

<style scoped lang="scss">

</style>