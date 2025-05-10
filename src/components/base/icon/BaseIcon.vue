<script setup lang="ts">
import {defineProps, useAttrs} from 'vue'
import {IconName} from "@/components/base/icon/types/name";

defineProps({
  name: String as IconName
})

const attrs = useAttrs()

</script>

<template>
  <span>
    <svg v-bind="attrs">
      <use :href="`/icons/sprite.svg#${name}`"/>
    </svg>
  </span>
</template>