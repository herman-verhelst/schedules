<script setup lang="ts">

import {useScheduleStore} from "@/stores/schedule.store";
import {storeToRefs} from "pinia";
import {computed} from 'vue';
import {format} from "date-fns";

const scheduleStore = useScheduleStore();
const {schedule} = storeToRefs(scheduleStore);

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

function getRowSpanForCurrentDayPart(slot: string, minute: number): number {
  console.log('slot', slot);
  console.log('minute', minute);
  // find the day part that starts at this slot
  const dayPart = schedule.value.dayParts.find(dp => {
    console.log(format(dp.startTime, 'HH:mm'))
    const startTime = format(dp.startTime, 'HH:mm');
    return startTime === slot;
  });
  console.log(dayPart)

  return 1;
}

</script>

<template>
  <div style="background: #FFFFFF; height: 297mm; font-family: 'LexendDeca-Regular'; font-weight: normal; position: relative">
    <div style="background: green; position: absolute; left: 20%; top: 20%; width: 100mm; height: 40mm; display: flex; align-items: center; justify-content: center">
      <p style="background: grey; padding-top: 20rem">haha</p>
      <p style="background: red">jaja</p>
    </div>
    <table style="width: 100%; height: 100%; table-layout: fixed; margin: 5mm">
      <tr style="height: 100%">
        <td style="font-size: 40px; font-family: 'LexendDeca-Bold'; font-weight: bold;">{{ schedule.title }}</td>
        <td style="height: 100%; ">
          <table style="height: 100%; width: 100%; border-collapse: collapse;">
            <template v-for="(slot, index) in halfHourTimeSlots" :key="index">
              <tr v-for="i in 6" :key="i">
                <td
                    v-if="i === 1"
                    :rowspan="6"
                    style="color: #777777; text-align: center; vertical-align: middle;"
                >
                  {{ slot }}
                </td>
                <td :rowspan="getRowSpanForCurrentDayPart(slot, i)">
                  activity
                </td>
              </tr>
            </template>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped lang="scss">

</style>