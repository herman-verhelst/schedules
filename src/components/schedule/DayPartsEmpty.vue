<script setup lang="ts">

import BaseTitle from "@/components/base/BaseTitle.vue";
import BaseText from "@/components/base/BaseText.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import {useScheduleStore} from "@/stores/schedule.store";

const scheduleStore = useScheduleStore();

function addDayPart(): void {
  scheduleStore.addDayPart()
}
</script>

<template>
<div class="px-24 flex flex-col justify-center h-full">
  <BaseTitle size="h4" class="mb-2">Dagdelen</BaseTitle>
  <BaseText grey class="mb-6">Voeg een eerste dagdeel toe om een nieuw dagschema te maken.</BaseText>
  <BaseButton @click="addDayPart" variant="primary">Maak een nieuw dagdeel</BaseButton>
</div>
</template>

<style scoped lang="scss">

</style>