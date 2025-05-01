<script setup lang="ts">
import {useScheduleStore} from "@/stores/schedule.store";
import {storeToRefs} from "pinia";
import CalendarElement from "@/components/schedule/CalendarElement.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import {useDebounce} from "@/composables/useDebounce";
import {computed, onMounted} from "vue";
import {differenceInMinutes} from "date-fns";
import {DayPart} from "@/models/dayPart.interface";
import {IconPlus} from "@tabler/icons-vue";

const scheduleStore = useScheduleStore();
const {schedule} = storeToRefs(scheduleStore)

// Height for 30 minutes
const dayPartHeight = 64;

function addDayPart(inFront: boolean): void {
  scheduleStore.addDayPart(inFront);
}

const title = computed({
  get: () => schedule.value.title,
  set: (newValue: string) => {
    schedule.value.title = newValue;
  }
});

const {debounce} = useDebounce(500);
const updateTitle = debounce(() => {
  scheduleStore.updateTitle(title.value)
});

const times = [];
for (let hour = 0; hour < 24; hour++) {
  const formattedHour = hour.toString().padStart(2, '0');

  times.push(`${formattedHour}:00`);
  times.push(`${formattedHour}:30`);
}

function getHeightOfSchedule(dayPart: DayPart): number {
  return (differenceInMinutes(dayPart.endTime, dayPart.startTime) * dayPartHeight / 30) - 2;
}

function getTopMarginOfSchedule(dayPart: DayPart, index: number): number {
  if (!index) return 0;
  return (differenceInMinutes(dayPart.startTime, schedule.value.dayParts[index - 1].endTime) * dayPartHeight / 30) + 1;
}

function getTopMarginOfButton(): number {
  if (!schedule.value.dayParts[0]) return dayPartHeight * 16 - 16;
  return (differenceInMinutes(schedule.value.dayParts[0].startTime, new Date().setHours(0, 0, 0)) * dayPartHeight / 30) - 63;
}

onMounted(() => {
  const element = document.getElementById('time-16');
  element.scrollIntoView();

})
</script>

<template>
  <div class="mt-8 flex flex-col gap-8 w-full">
    <div class="px-8">
      <input
          type="text"
          placeholder="Geef je schema een titel..."
          v-model="title"
          @input="updateTitle"
          class="text-3xl outline-none text-grayscale-100 placeholder:text-grayscale-80"/>
    </div>

    <div class="h-full w-full border-t border-grayscale-20 px-8">
      <div class="relative h-full w-full overflow-auto no-scrollbar">
        <div class="h-full w-full absolute left-0 top-0 h-full flex" :style="`gap: ${dayPartHeight / 2}px`">
          <div class="w-8">
            <p :id="`time-${n}`" v-for="n in 48" class="w-full text-xs text-grayscale-80 tabular-nums flex items-center"
               :style="`height: ${dayPartHeight}px`">
              {{ times[n - 1] }}</p>
          </div>
          <div class="w-full">
            <div v-for="n in 48" class="w-full flex items-center" :style="`height: ${dayPartHeight}px`">
              <div class="w-full h-[1px] bg-grayscale-20 my-4"></div>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center gap-16 absolute w-full min-h-full h-fit h pl-17 pr-1">
          <BaseButton
              icon
              :style="`margin-top: ${getTopMarginOfButton()}px`"
              @click="addDayPart(true)">
            <IconPlus size="14"></IconPlus>
          </BaseButton>
          <div class="flex flex-col items-center w-full">
            <CalendarElement
                v-for="(dayPart, index) in schedule.dayParts"
                class="my-[1px]"
                :style="`height: ${getHeightOfSchedule(dayPart)}px; margin-top: ${getTopMarginOfSchedule(dayPart, index)}px`"
                :day-part="dayPart"></CalendarElement>
          </div>
          <BaseButton v-if="schedule.dayParts?.length > 0" @click="addDayPart(false)" icon>
            <IconPlus size="14"></IconPlus>
          </BaseButton>
        </div>
      </div>

    </div>

  </div>

</template>

<style scoped lang="scss">

</style>