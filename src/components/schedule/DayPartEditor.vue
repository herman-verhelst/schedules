<script setup lang="ts">
import {PropType} from "vue";
import {DayPart} from "@/models/dayPart.interface";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";

defineProps({
  dayPart: {
    required: true,
    type: Object as PropType<DayPart>
  }
})
</script>

<template>
  <div class="flex flex-col gap-16 my-8">
    <div class="flex flex-col gap-6">
      <BaseTitle size="h4" grey>Eigenschappen</BaseTitle>
      <div class="flex-col flex gap-2">
        <BaseInput type="time" label="Startmoment" v-model="dayPart.startTime"></BaseInput>
        <BaseInput type="time" label="Eindmoment" v-model="dayPart.endTime"></BaseInput>
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <BaseTitle size="h4" grey>Activiteiten</BaseTitle>
    </div>
  </div>

</template>

<style scoped lang="scss">

</style>