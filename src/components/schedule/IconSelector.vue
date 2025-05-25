<script setup lang="ts">

import BaseButton from "@/components/base/BaseButton.vue";
import IconList from "@/components/schedule/IconList.vue";
import {ref, watch} from "vue";
import BaseIcon from "@/components/base/icon/BaseIcon.vue";
import {makeFirstLetterUpperCase} from "@/utils/string.utils";
import BasePopover from "@/components/base/BasePopover.vue";

let iconListOpen = ref(false);

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
  },
})

function toggleIconList(): void {
  iconListOpen.value = !iconListOpen.value;
}

function closeIconList(): void {
  iconListOpen.value = false;
}

watch(() => props.selectedIcon, () => {
  closeIconList();
})
</script>

<template>
  <div v-click-outside="closeIconList">
    <BaseButton variant="subtle" :class="{'!text-grayscale-80': selectedIcon == 'empty'}" @click="toggleIconList()">
      <template v-if="selectedIcon != 'empty'">
        <BaseIcon class="w-6 h-6" :name="selectedIcon.icon"/>
        {{ makeFirstLetterUpperCase(selectedIcon.officialName) }}
      </template>
      <template v-else>
        Selecteer icoon
      </template>
    </BaseButton>

    <BasePopover v-if="iconListOpen">
      <IconList :activity-id="activityId" :day-part-id="dayPartId" :selected-icon="selectedIcon"></IconList>
    </BasePopover>
  </div>


</template>

<style scoped lang="scss">

</style>