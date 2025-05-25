<script setup lang="ts">
import BaseIcon from "@/components/base/icon/BaseIcon.vue";
import {IconName} from "@/components/base/icon/types/name";
import {useScheduleStore} from "@/stores/schedule.store";
import {useIconStore} from "@/stores/icon.store";
import {storeToRefs} from "pinia";
import {makeFirstLetterUpperCase} from "@/utils/string.utils";
import {computed, ref, onMounted, PropType} from "vue";

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
    required: true,
  }
});

const scheduleStore = useScheduleStore();
const iconStore = useIconStore();
const {icons} = storeToRefs(iconStore);

const searchQuery = ref("");
const searchInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  searchInput.value?.focus();
});

const filteredIcons = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return icons.value.filter(icon =>
    icon.officialName.toLowerCase().includes(query) ||
    icon.icon.toLowerCase().includes(query) ||
    icon.alternativeNames.some(name => name.toLowerCase().includes(query))
  );
});

function setSelectedIcon(icon: IconName): void {
  scheduleStore.updateIconOfActivity(icon, props.activityId, props.dayPartId);
}
</script>

<template>
    <input
        v-model="searchQuery"
        ref="searchInput"
        type="text"
        placeholder="Search icons..."
        class="p-3 border-b-1 border-grayscale-20 w-full focus:bg-grayscale-10 focus:outline-none"
    />

    <div class="p-2 overflow-auto max-h-64 flex flex-col gap-1">
      <button
          @click="setSelectedIcon(icon)"
          v-for="icon in filteredIcons"
          :key="icon.icon"
          class="flex gap-2 w-full rounded p-1 hover:bg-grayscale-10 focus:bg-grayscale-20 focus:outline-none"
          :class="{'bg-grayscale-15': icon.icon === selectedIcon.icon}">
        <BaseIcon class="w-6 h-6" :name="icon.icon"/>
        <span class="icon-label">{{ makeFirstLetterUpperCase(icon.officialName) }}</span>
      </button>
    </div>
</template>

<style scoped lang="scss">

</style>