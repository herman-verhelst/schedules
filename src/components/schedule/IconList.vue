<script setup lang="ts">
import BaseIcon from "@/components/base/icon/BaseIcon.vue";
import {iconNames} from "@/components/base/icon/types/iconNames.js";
import {IconName} from "@/components/base/icon/types/name";
import {useScheduleStore} from "@/stores/schedule.store";

const props = defineProps({
  activityId: {
    type: String,
    required: true,
  },
  dayPartId: {
    type: String,
    required: true,
  },
  selectedIcon: {
    type: String,
    required: true,
  }
});

const scheduleStore = useScheduleStore();

function setSelectedIcon(icon: IconName): void {
  scheduleStore.updateIconOfActivity(icon, props.activityId, props.dayPartId);
}
</script>

<template>
  <div class="absolute rounded bg-grayscale-0 border border-grayscale-20 shadow w-64 mt-1">
    <div class="p-2 overflow-auto max-h-64 flex flex-col gap-1">
      <button
          @click="setSelectedIcon(icon)"
          v-for="icon in iconNames"
          :key="icon"
          class="flex gap-2 w-full rounded p-1 hover:bg-grayscale-10"
          :class="{'bg-grayscale-15': icon === selectedIcon}">
        <BaseIcon class="w-6 h-6" :name="icon"/>
        <span class="icon-label">{{ icon }}</span>
      </button>
    </div>

  </div>
</template>

<style scoped lang="scss">

</style>