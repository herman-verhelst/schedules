<script setup lang="ts">

import BaseDialog from "@/components/base/dialog/BaseDialog.vue";
import BaseDialogHeader from "@/components/base/dialog/BaseDialogHeader.vue";
import BaseDialogTitle from "@/components/base/dialog/BaseDialogTitle.vue";
import {ref} from "vue";
import BaseDialogContent from "@/components/base/dialog/BaseDialogContent.vue";
import BaseDialogFooter from "@/components/base/dialog/BaseDialogFooter.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import {IconDownload} from "@tabler/icons-vue";
import jsPDF from "jspdf";
import SchedulePDF from "@/components/schedule/SchedulePDF.vue";
import {addBoldFont} from "@/utils/fonts/LexendDeca-bold";
import {addRegularFont} from "@/utils/fonts/LexendDeca-normal";

const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}

const pdfContent = ref<HTMLDivElement | null>(null);
import { svg2pdf } from "svg2pdf.js";

function createPDF(): void {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  addBoldFont(pdf);
  addRegularFont(pdf);
  pdf.setFont('LexendDeca-Bold', 'bold');
  pdf.setFont('LexendDeca-Regular', 'normal');

  const svgs = pdfContent.value?.querySelectorAll('svg');
  const hiddenSvgs: HTMLElement[] = [];
  svgs?.forEach(svg => {
    svg.style.visibility = 'hidden';
    hiddenSvgs.push(svg);
  });

  pdf.html(pdfContent.value!, {
    callback: async (doc) => {
      hiddenSvgs.forEach(svg => svg.style.visibility = 'visible');

      const containerRect = pdfContent.value!.getBoundingClientRect();

      for (const svg of hiddenSvgs) {
        try {
          const rect = svg.getBoundingClientRect();

          const x = (rect.left - containerRect.left) * 210 / containerRect.width;
          const y = (rect.top - containerRect.top) * 297 / containerRect.height;
          const width = rect.width * 210 / containerRect.width;
          const height = rect.height * 297 / containerRect.height;

          await svg2pdf(svg as SVGSVGElement, doc, { x, y, width, height });
        } catch (err) {
          console.warn("Skipping SVG due to error:", err);
        }
      }

      doc.save('dagschema.pdf');
    },
    width: 210,
    height: 297,
    windowWidth: pdfContent.value?.offsetWidth,
    windowHeight: pdfContent.value?.offsetHeight,
  });
}
</script>

<template>
  <BaseDialog>
    <BaseDialogHeader @close="closeModal">
      <BaseDialogTitle>
        Exporteer dagschema
      </BaseDialogTitle>
    </BaseDialogHeader>
    <BaseDialogContent class="bg-grayscale-100 py-2 overflow-auto flex justify-center">
      <div style="width: 210mm; height: 297mm;">
        <div ref="pdfContent">
          <SchedulePDF></SchedulePDF>
        </div>
      </div>

    </BaseDialogContent>
    <BaseDialogFooter>
      <BaseButton @click="createPDF" variant="primary">
        <IconDownload size="14"></IconDownload>
        Download PDF
      </BaseButton>
    </BaseDialogFooter>
  </BaseDialog>
</template>

<style scoped lang="scss">

</style>