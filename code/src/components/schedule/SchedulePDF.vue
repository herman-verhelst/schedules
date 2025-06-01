<script setup lang="ts">

import {useScheduleStore} from "@/stores/schedule.store";
import {storeToRefs} from "pinia";
import {computed, PropType} from 'vue';
import {differenceInMinutes, format} from "date-fns";
import {DayPart} from "@/models/dayPart.interface";
import BaseIcon from "@/components/base/icon/BaseIcon.vue";

const scheduleStore = useScheduleStore();
const {schedule} = storeToRefs(scheduleStore);

const props = defineProps({
  pageSize: {
    type: Object as PropType<{ width: number; height: number }>,
    required: true,
  },
})

const padding = 5;

console.log(schedule.value)

const halfHourTimeSlots = computed((): string[] => {
  const startTimes = schedule.value.dayParts.map(dp => dp.startTime);
  const endTimes = schedule.value.dayParts.map(dp => dp.endTime);

  const minStart = new Date(startTimes[0])
  const maxEnd = new Date(endTimes[endTimes.length - 1]);

  const times: string[] = [];
  const current = new Date(minStart);

  current.setMinutes(current.getMinutes() - (current.getMinutes() % 30)); // round down to nearest half hour

  while (current <= maxEnd) {
    times.push(format(current, 'HH:mm'))
    current.setMinutes(current.getMinutes() + 30);
  }

  // When endtime is not on a half hour, round it up to the next half hour
  if (maxEnd.getMinutes() % 30 !== 0) {
    maxEnd.setMinutes(maxEnd.getMinutes() + (30 - (maxEnd.getMinutes() % 30)));
    times.push(format(maxEnd, 'HH:mm'));
  }

  return times;
});

const halfHourTimeSlotHeight = computed(() => {
  return (props.pageSize.height - 2 * padding) / halfHourTimeSlots.value.length;
})

function getHeightOfDayPart(dayPart: DayPart): number {
  return differenceInMinutes(dayPart.endTime, dayPart.startTime) / 30 * halfHourTimeSlotHeight.value;
}

function getTopMarginOfDayPart(dayPart: DayPart, index: number): number {
  if (!index) {
    const firstDayPartStart = new Date(schedule.value.dayParts[0].startTime);
    firstDayPartStart.setMinutes(firstDayPartStart.getMinutes() - (firstDayPartStart.getMinutes() % 30 + 15));
    return differenceInMinutes(schedule.value.dayParts[0].startTime, firstDayPartStart) / 30 * halfHourTimeSlotHeight.value;
  }
  return (differenceInMinutes(dayPart.startTime, schedule.value.dayParts[index - 1].endTime) * halfHourTimeSlotHeight.value / 30);
}

</script>

<template>
  <div
      :style="`height: ${pageSize.height}mm; width: ${pageSize.width}mm; padding: ${padding}mm;`"
      style="
      background: #FFFFFF;
      font-family: 'LexendDeca-Regular';
      font-weight: normal;
      position: relative;
      display: flex;">
    <div style="width: calc(4/12 * 100%); margin-right: calc(1/12 * 100%); ">
      <p style="font-size: 40px; line-height: 48px; font-family: 'LexendDeca-Bold'; font-weight: bold;">
        {{ schedule.title }}
      </p>
    </div>
    <div style="
      width: calc(1/12 * 100%);
      color: #777777;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-variant-numeric: tabular-nums;
      justify-content: space-around">
      <p v-for="slot in halfHourTimeSlots" style="font-family: 'LexendDeca-Light'; font-size: 16px; line-height: 16px">{{ slot }}</p>
    </div>
    <div style="
    width: 50%;
">
      <div
          v-for="(dayPart, index) in schedule.dayParts"
          style="border-top: 1px solid #E8E8E8; border-bottom: 1px solid #E8E8E8; display: flex; gap: 2mm"
          :style="`
          height: ${getHeightOfDayPart(dayPart)}mm;
          margin-top: ${getTopMarginOfDayPart(dayPart, index)}mm;`"
      >
        <div v-for="activity in dayPart.activities"
             style="display: flex; align-items: center; gap: 4mm; height: 100%; width: 100%;"
             :style="`border-left: 4px solid ${activity.type?.color};`">
          <div style="padding: 2mm; width: 100%; display: flex; align-items: center; "
               :style="`flex-direction: ${dayPart.activities.length > 1 ? 'column' : 'row'}; gap: ${dayPart.activities.length > 1 ? '2mm' : '8mm'}; align-items: center;`">
            <BaseIcon v-if="activity.icon" style="width: 20mm; height: 20mm;" :name="activity.icon.icon"
                      inline></BaseIcon>
            {{ activity.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>