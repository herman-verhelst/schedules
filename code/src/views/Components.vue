<script setup>
import BaseButton from "../components/base/BaseButton.vue";
import BaseText from "@/components/base/BaseText.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";
import BaseInput from "@/components/base/BaseInput.vue";

import {IconDownload, IconX} from "@tabler/icons-vue";
</script>

<template>
  <main class="h-full overflow-auto">
    <BaseTitle size="h1" class="mb-8">Components</BaseTitle>
    <div class="mb-16">
      <BaseTitle size="h2" class="mb-4">Buttons</BaseTitle>
      <div class="flex flex-col gap-2 mb-4">
        <BaseTitle size="h3" class="mb-2">Style</BaseTitle>

        <BaseButton variant="primary">Primary</BaseButton>
        <BaseButton variant="default">Default</BaseButton>
        <BaseButton variant="subtle">Subtle</BaseButton>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <BaseTitle size="h3" class="mb-2">Size</BaseTitle>

        <BaseButton size="m">Medium</BaseButton>
        <BaseButton size="s">Small</BaseButton>
        <BaseButton size="xs">X Small</BaseButton>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <BaseTitle size="h3" class="mb-2">Icons</BaseTitle>

        <BaseButton>None</BaseButton>
        <BaseButton>
          <IconDownload :size="14"></IconDownload>
          Front
        </BaseButton>
        <BaseButton>Back
          <IconX :size="14"></IconX>
        </BaseButton>
        <BaseButton>
          <IconDownload :size="14"></IconDownload>
          Both
          <IconX :size="14"></IconX>
        </BaseButton>

        <BaseButton icon>
          <IconX :size="14"></IconX>
        </BaseButton>
      </div>

    </div>

    <div class="mb-16">
      <BaseTitle size="h2" class="mb-4">Input</BaseTitle>
      <div class="flex flex-col gap-2 mb-4">
        <BaseTitle size="h3" class="mb-2">Time</BaseTitle>

        <BaseInput
            label="Label"
            description="Aute aliquip irure id sit dolore ad reprehenderit cupidatat nulla Lorem sit non."
            error="Aliquip velit laborum dolor dolor ad dolor aliqua est do minim consequat ipsum ut minim."
            type="time"
        >

        </BaseInput>
      </div>

    </div>

    <div class="mb-16">

      <BaseTitle size="h2" class="mb-4">Text</BaseTitle>

      <div class="flex flex-col gap-2 mb-4">
        <BaseTitle size="h3" class="mb-2">Size</BaseTitle>

        <BaseText>This is the default text size.</BaseText>
        <BaseText size="small">This is the small text size.</BaseText>
        <BaseText size="large">This is the large text size.</BaseText>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <BaseTitle size="h3" class="mb-2">Color</BaseTitle>

        <BaseText>This is the default text color.</BaseText>
        <BaseText grey>This is the grey text color.</BaseText>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <BaseTitle size="h3" class="mb-2">Bold</BaseTitle>

        <BaseText>This is the default text weight.</BaseText>
        <BaseText bold>This is the bold text weight.</BaseText>
      </div>
    </div>

    <div class="mb-16">
      <BaseTitle size="h2" class="mb-4">Title</BaseTitle>

      <div class="flex flex-col gap-2 mb-4">
        <BaseTitle size="h3" class="mb-2">Size</BaseTitle>

        <BaseTitle size="h1">Heading 1</BaseTitle>
        <BaseTitle size="h2">Heading 2</BaseTitle>
        <BaseTitle size="h3">Heading 3</BaseTitle>
        <BaseTitle size="h4">Heading 4</BaseTitle>
      </div>

    </div>
  </main>
</template>

<style scoped>

</style>