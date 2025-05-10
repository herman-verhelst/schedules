<script setup lang="ts">

import BaseButton from "@/components/base/BaseButton.vue";
import IconList from "@/components/schedule/IconList.vue";
import {ref} from "vue";
import BaseIcon from "@/components/base/icon/BaseIcon.vue";

let iconListOpen = ref(false);

defineProps({
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
  },
})

function toggleIconList(): void {
  iconListOpen.value = !iconListOpen.value;
}

</script>

<template>
  <BaseButton variant="subtle" :class="{'!text-grayscale-80': !selectedIcon}" @click="toggleIconList()">
    <template v-if="selectedIcon">
      <BaseIcon class="w-6 h-6" :name="selectedIcon"/>
      {{ selectedIcon }}
    </template>
    <template v-else>
      Selecteer icoon
    </template>
  </BaseButton>

  <div v-if="iconListOpen">
    <IconList :activity-id="activityId" :day-part-id="dayPartId" :selected-icon="selectedIcon"></IconList>
  </div>

</template>

<style scoped lang="scss">

</style>