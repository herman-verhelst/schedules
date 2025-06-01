<script setup>
import {ref} from "vue";

defineProps({
  placeholder: {
    type: String
  },
  fitWidth: {
    type: Boolean,
    default: false
  }
})

const inputRef = ref(null)

const model = defineModel();

// Expose the focus method to parent
const focusInput = () => {
  inputRef.value?.focus()
}

defineExpose({
  focusInput
})
</script>

<template>
  <td :class="{'w-1 no-wrap': fitWidth}"
      class="text-base text-left w-full h-1 max-h-12 border-b border-grayscale-20">

    <input
        ref="inputRef"
        v-model="model"
        type="text"
        :placeholder="placeholder"
        class="px-2 h-7 text-base outline-none text-grayscale-100 placeholder:text-grayscale-80 w-full focus:shadow-l focus:border focus:border-grayscale-40 focus:rounded focus:bg-grayscale-0 transition"/>

  </td>
</template>