<script setup lang="ts">
import {PropType, ref, watch} from "vue";
import {DayPart} from "@/models/dayPart.interface";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";
import {format} from "date-fns";
import {useScheduleStore} from "@/stores/schedule.store";
import BaseButton from "@/components/base/BaseButton.vue";
import {IconPlus, IconTrash} from "@tabler/icons-vue";

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

function removeDayPart(): void {
  scheduleStore.removeDayPart(props.dayPart.id);
}
</script>

<template>
  <div class="flex flex-col justify-between items-end py-8 h-full">
    <div class="flex flex-col gap-16 w-full">
      <div class="flex flex-col gap-6">
        <BaseTitle size="h4" grey>Eigenschappen</BaseTitle>
        <div class="flex-col flex gap-2">
          <BaseInput is-horizontal type="time" label="Startmoment" v-model="startTime"></BaseInput>
          <BaseInput is-horizontal type="time" label="Eindmoment" v-model="endTime"></BaseInput>
        </div>
      </div>

      <div class="flex items-center w-full justify-between gap-6">
        <BaseTitle size="h4" grey>Activiteiten</BaseTitle>
        <BaseButton icon>
          <IconPlus size="14"></IconPlus>
        </BaseButton>
      </div>
    </div>

    <BaseButton @click="removeDayPart" icon variant="subtle">
      <IconTrash size="14"></IconTrash>
    </BaseButton>
  </div>

</template>

<style scoped lang="scss">

</style>