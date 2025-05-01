<script setup lang="ts">
import {PropType, ref, watch} from "vue";
import {DayPart} from "@/models/dayPart.interface";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";
import {format} from "date-fns";
import {useScheduleStore} from "@/stores/schedule.store";

const props = defineProps({
  dayPart: {
    required: true,
    type: Object as PropType<DayPart>
  }
});

const scheduleStore = useScheduleStore();

const startTime = ref('');
const endTime = ref('');

watch(() => props.dayPart, (newDayPart) => {
  startTime.value = format(newDayPart.startTime, 'HH:mm');
  endTime.value = format(newDayPart.endTime, 'HH:mm');
}, { immediate: true });

watch(startTime, (val) => {
  const [hours, minutes] = val.split(':').map(Number);
  scheduleStore.updateTime(
      props.dayPart.id,
      new Date().setHours(hours, minutes, 0),
      'start'
  );
});

watch(endTime, (val) => {
  const [hours, minutes] = val.split(':').map(Number);
  scheduleStore.updateTime(
      props.dayPart.id,
      new Date().setHours(hours, minutes, 0),
      'end'
  );
});
</script>

<template>
  <div class="flex flex-col gap-16 my-8">
    <div class="flex flex-col gap-6">
      <BaseTitle size="h4" grey>Eigenschappen</BaseTitle>
      <div class="flex-col flex gap-2">
        <BaseInput is-horizontal type="time" label="Startmoment" v-model="startTime"></BaseInput>
        <BaseInput is-horizontal type="time" label="Eindmoment" v-model="endTime"></BaseInput>
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <BaseTitle size="h4" grey>Activiteiten</BaseTitle>
    </div>
  </div>

</template>

<style scoped lang="scss">

</style>