<script setup lang="ts">
import {ActivityType} from "@/models/activityType.interface";
import {PropType, useAttrs} from "vue";

defineProps({
  activityType: {
    type: Object as PropType<ActivityType | null>,
    default: null,
  },
});

const attrs = useAttrs()

</script>

<template>
  <p v-bind="attrs" v-if="activityType" class="text-base flex items-center gap-2">
    <span class="w-1 h-1 rounded-full" :style="{'background-color': activityType.color}"></span>
    {{ activityType.type }}
  </p>
</template>

<style scoped lang="scss">

</style>