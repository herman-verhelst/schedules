<script setup lang="ts">

import BaseButton from "@/components/base/BaseButton.vue";
import BasePopover from "@/components/base/BasePopover.vue";
import {ActivityType} from "@/models/activityType.enum";
import {PropType, ref} from "vue";
import {useScheduleStore} from "@/stores/schedule.store";
import ActivityTypeRenderer from "@/components/schedule/ActivityTypeRenderer.vue";

let activityTypeOpen = ref(false);
const activityTypes = Object.values(ActivityType);

const scheduleStore = useScheduleStore();

const props = defineProps({
  activityId: {
    type: String,
    required: true,
  },
  dayPartId: {
    type: String,
    required: true,
  },
  selectedActivityType: {
    type: Object as PropType<ActivityType | null> ,
    default: null,
  },
})

function toggleIconList(): void {
  activityTypeOpen.value = !activityTypeOpen.value;
}

function closeIconList(): void {
  activityTypeOpen.value = false;
}

function setSelectedActivityType(activityType: ActivityType | undefined): void {
  scheduleStore.updateActivityTypeOfActivity(activityType, props.activityId, props.dayPartId);
  closeIconList();
}
</script>

<template>
  <div v-click-outside="closeIconList" class="w-full">
    <BaseButton variant="subtle" :class="{'!text-grayscale-80': !selectedActivityType}" @click="toggleIconList()">
      <template v-if="selectedActivityType">
        <ActivityTypeRenderer :activity-type="selectedActivityType"></ActivityTypeRenderer>
      </template>
      <template v-else>
        Selecteer type
      </template>
    </BaseButton>

    <BasePopover v-if="activityTypeOpen">
      <div class="p-1 flex flex-col gap-1">
        <button
            @click="setSelectedActivityType()"
            class="flex text-grayscale-80 gap-2 items-center w-full rounded p-1 hover:bg-grayscale-10 focus:bg-grayscale-20 focus:outline-none"
            :class="{'bg-grayscale-15': !selectedActivityType}">
          Zonder type
        </button>
        <button
            @click="setSelectedActivityType(activityType)"
            v-for="activityType in activityTypes"
            :key="activityType.id"
            class="flex gap-2 items-center w-full rounded p-1 hover:bg-grayscale-10 focus:bg-grayscale-20 focus:outline-none"
            :class="{'bg-grayscale-15': activityType.id === selectedActivityType?.id}">
          <ActivityTypeRenderer class="ml-2" :activity-type="activityType"></ActivityTypeRenderer>
        </button>
      </div>

    </BasePopover>
  </div>

</template>

<style scoped lang="scss">

</style>