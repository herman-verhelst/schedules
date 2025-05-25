<script setup lang="ts">

import {useScheduleStore} from "@/stores/schedule.store";
import {storeToRefs} from "pinia";
import {computed} from 'vue';

const scheduleStore = useScheduleStore();
const {schedule} = storeToRefs(scheduleStore);


const halfHourTimeSlots = computed((): string[] => {
  console.log(schedule);
  const startTimes = schedule.value.dayParts.map(dp => dp.startTime);
  const endTimes = schedule.value.dayParts.map(dp => dp.endTime);

  const times: string[] = [];
  const current = new Date(minStart);

  current.setMinutes(current.getMinutes() - (current.getMinutes() % 30)); // round down to nearest half hour

  while (current <= maxEnd) {
    const hours = String(current.getHours()).padStart(2, '0');
    const minutes = String(current.getMinutes()).padStart(2, '0');
    times.push(`${hours}:${minutes}`);
    current.setMinutes(current.getMinutes() + 30);
  }
  console.log(times);
  return times;
});

</script>

<template>
  <div style="background: #FFFFFF; height: 297mm; font-family: 'LexendDeca-Regular'; font-weight: normal;">
    <table style="width: 100%; height: 100%; table-layout: fixed; margin: 5mm">
      <tr style="height: 100%">
        <td style="font-size: 40px; font-family: 'LexendDeca-Bold'; font-weight: bold;">{{ schedule.title }}</td>
        <td style="height: 100%; ">
          <table style="display: block; width: 100%; height: 100%; background: red">
            <tr style="display: block; height: 100%; background: green">
              <td style="height:100%; display: block">
                <p style="height: 100%; color: #777777" :style="`height:  ${100 / halfHourTimeSlots.length}%`"
                   v-for="time in halfHourTimeSlots">{{ time }}</p>
              </td>
              <td></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped lang="scss">

</style>