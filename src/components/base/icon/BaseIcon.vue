<script setup lang="ts">
import {computed, useAttrs} from 'vue'
import {IconName} from "@/components/base/icon/types/name";
import {iconDefinitions} from "@/components/base/icon/types/iconDefinitions";

const props = defineProps({
  name: String as IconName,
  inline: {
    type: Boolean,
    default: false,
  },
})

const inlineSVG = computed(() => {
  return props.inline ? iconDefinitions[props.name] ?? null : null;
});

const attrs = useAttrs()

</script>

<template>
  <span>
    <span v-if="inline" v-html="inlineSVG" v-bind="attrs"/>
    <svg v-else v-bind="attrs">
      <use :href="`/icons/sprite.svg#${name}`"/>
    </svg>
  </span>
</template>