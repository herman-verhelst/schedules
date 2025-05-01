<script setup lang="ts">
import {PropType} from "vue";
import {DayPart} from "@/models/dayPart.interface";
import {format} from "date-fns";
import {useScheduleStore} from "@/stores/schedule.store";

const props = defineProps({
  dayPart: {
    type: Object as PropType<DayPart>,
    required: true
  }
})

const scheduleStore = useScheduleStore();

console.log(props.dayPart.selected)

function setAsActive(): void {
  scheduleStore.setActiveDayPart(props.dayPart.id)
}
</script>

<template>
  <div :class="{'border-grayscale-20 bg-grayscale-5': !dayPart.selected}" class="border border-electric-indigo-100 bg-electric-indigo-5 rounded-sm p-4 w-full" @click="setAsActive">
    <p class="text-sm text-grayscale-80 tabular-nums">
      {{ format(dayPart.startTime, 'HH:mm') }} - {{ format(dayPart.endTime, 'HH:mm') }}
    </p>
  </div>
</template>

<style scoped lang="scss">

</style>