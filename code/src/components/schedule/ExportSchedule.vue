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
import {addLightFont} from "@/utils/fonts/LexendDeca-light";
import {svg2pdf} from "svg2pdf.js";
import BaseDialogDescription from "@/components/base/dialog/BaseDialogDescription.vue";

const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}

const pdfContent = ref<HTMLDivElement | null>(null);
const pdfSize = {
  width: 297,
  height: 420
}

function createPDF(): void {
  const pdf = new jsPDF({orientation: 'portrait', unit: 'mm', format: 'a3'});
  addBoldFont(pdf);
  addRegularFont(pdf);
  addLightFont(pdf);
  pdf.setFont('LexendDeca-Bold', 'bold');
  pdf.setFont('LexendDeca-Regular', 'normal');
  pdf.setFont('LexendDeca-Light', 'normal');

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

          const x = (rect.left - containerRect.left) * pdfSize.width / containerRect.width;
          const y = (rect.top - containerRect.top) * pdfSize.height / containerRect.height;
          const width = rect.width * pdfSize.width / containerRect.width;
          const height = rect.height * pdfSize.height / containerRect.height;

          await svg2pdf(svg as SVGSVGElement, doc, {x, y, width, height});
        } catch (err) {
          console.warn("Skipping SVG due to error:", err);
        }
      }

      doc.save('dagschema.pdf');
    },
    width: pdfSize.width,
    height: pdfSize.height,
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
      <BaseDialogDescription>
        Exporteer het dagschema als PDF. De PDF is geoptimaliseerd voor afdrukken op A3-formaat.
      </BaseDialogDescription>
    </BaseDialogHeader>
    <BaseDialogContent class="bg-grayscale-100 py-2 overflow-auto">
      <div :style="`width: ${pdfSize.width}mm; height: ${pdfSize.height}mm;`">
        <div ref="pdfContent">
          <SchedulePDF :page-size="pdfSize"></SchedulePDF>
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