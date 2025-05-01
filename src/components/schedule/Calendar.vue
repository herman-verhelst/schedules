<script setup lang="ts">
import {useScheduleStore} from "@/stores/schedule.store";
import {storeToRefs} from "pinia";
import CalendarElement from "@/components/schedule/CalendarElement.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import {useDebounce} from "@/composables/useDebounce";
import {computed} from "vue";

const scheduleStore = useScheduleStore();
const {schedule} = storeToRefs(scheduleStore)

function addDayPart(inFront: boolean): void {
  scheduleStore.addDayPart(inFront);
}

const title = computed({
  get: () => schedule.value.title,
  set: (newValue: string) => {
    schedule.value.title = newValue;
  }
});

const { debounce } = useDebounce(500);
const updateTitle = debounce(() => {
  scheduleStore.updateTitle(title.value)
});

</script>

<template>
  <div class="my-8 flex flex-col gap-8">
    <input type="text" placeholder="Geef je schema een titel..."
           v-model="title"
           @input="updateTitle"
           class="text-2xl outline-none text-grayscale-100 placeholder:text-grayscale-80"/>

    <div>
      
    </div>

    <div class="flex flex-col items-center gap-16">
      <BaseButton @click="addDayPart(true)">Add</BaseButton>
      <div class="flex flex-col items-center gap-2 w-full">
        <CalendarElement v-for="dayPart in schedule.dayParts" :day-part="dayPart"></CalendarElement>
      </div>
      <BaseButton @click="addDayPart(false)">Add</BaseButton>
    </div>
  </div>

</template>

<style scoped lang="scss">

</style>