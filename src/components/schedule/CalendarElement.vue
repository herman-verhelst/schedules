<script setup lang="ts">
import {PropType} from "vue";
import {DayPart} from "@/models/dayPart.interface";
import {format} from "date-fns";
import {useScheduleStore} from "@/stores/schedule.store";
import BaseIcon from "@/components/base/icon/BaseIcon.vue";
import ActivityTypeRenderer from "@/components/schedule/ActivityTypeRenderer.vue";

const props = defineProps({
  dayPart: {
    type: Object as PropType<DayPart>,
    required: true
  }
})

const scheduleStore = useScheduleStore();

function setAsActive(): void {
  scheduleStore.setActiveDayPart(props.dayPart.id)
}
</script>

<template>
  <div :class="{'border-grayscale-20 bg-grayscale-5': !dayPart.selected}"
       class="border border-electric-indigo-100 bg-electric-indigo-5 rounded-sm p-4 w-full flex justify-between items-center" @click="setAsActive">
    <div class="flex gap-8">
      <div v-for="activity in dayPart.activities" class="flex items-center gap-4 min-w-24" :class="{'flex-col !gap-1': dayPart.activities.length > 1}">
        <BaseIcon class="w-12 h-12" :class="{'!w-8 !h-8': dayPart.activities.length > 1}" :name="activity.icon.icon"></BaseIcon>
        <div>
          <p class="text-base font-bold">{{ activity.description }}</p>
          <ActivityTypeRenderer class="text-sm" :activity-type="activity.type"></ActivityTypeRenderer>
        </div>
      </div>
    </div>
    <p class="text-sm text-grayscale-80 tabular-nums">
      {{ format(dayPart.startTime, 'HH:mm') }} - {{ format(dayPart.endTime, 'HH:mm') }}
    </p>
  </div>
</template>

<style scoped lang="scss">

</style>