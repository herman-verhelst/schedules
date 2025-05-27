<script setup lang="ts">
import {nextTick, onMounted, PropType, ref, watch} from "vue";
import {DayPart} from "@/models/dayPart.interface";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseTitle from "@/components/base/BaseTitle.vue";
import {format} from "date-fns";
import {useScheduleStore} from "@/stores/schedule.store";
import BaseButton from "@/components/base/BaseButton.vue";
import {IconPlus, IconTrash} from "@tabler/icons-vue";
import BaseTable from "@/components/base/table/BaseTable.vue";
import BaseTableHeader from "@/components/base/table/BaseTableHeader.vue";
import BaseTableRow from "@/components/base/table/BaseTableRow.vue";
import BaseTableHead from "@/components/base/table/BaseTableHead.vue";
import BaseTableBody from "@/components/base/table/BaseTableBody.vue";
import BaseTableCell from "@/components/base/table/BaseTableCell.vue";
import IconSelector from "@/components/schedule/IconSelector.vue";
import {useDebounce} from "@/composables/useDebounce";
import {Activity} from "@/models/activity.interface";
import ActivityTypeSelector from "@/components/schedule/ActivityTypeSelector.vue";
import BaseTableInput from "@/components/base/table/BaseTableInput.vue";

const props = defineProps({
  dayPart: {
    required: true,
    type: Object as PropType<DayPart>
  }
});

const scheduleStore = useScheduleStore();

const startTime = ref('');
const endTime = ref('');

const activityInputs = ref<Record<string, InstanceType<typeof HTMLInputElement> | null>>({});

function setInputRef(activityId: string, el: any) {
  if (el && el.$el) {
    activityInputs.value[activityId] = el.$el.querySelector('input');
  }
}

onMounted(() => {
  nextTick(() => {
    const firstInput = Object.values(activityInputs.value)[0];
    firstInput?.focusInput();
  });
})

watch(() => props.dayPart, (newDayPart) => {
  startTime.value = format(newDayPart.startTime, 'HH:mm');
  endTime.value = format(newDayPart.endTime, 'HH:mm');

  nextTick(() => {
    const firstInput = Object.values(activityInputs.value)[0];
    firstInput?.focusInput();
  });
}, {immediate: true});

watch(startTime, (val) => {
  const [hours, minutes] = val.split(':').map(Number);
  scheduleStore.updateTime(
      props.dayPart.id,
      new Date().setHours(hours, minutes, 0, 0),
      'start'
  );
});

watch(endTime, (val) => {
  const [hours, minutes] = val.split(':').map(Number);
  scheduleStore.updateTime(
      props.dayPart.id,
      new Date().setHours(hours, minutes, 0, 0),
      'end'
  );
});

function removeDayPart(): void {
  scheduleStore.removeDayPart(props.dayPart.id);
}

function removeActivity(activityId: string): void {
  scheduleStore.removeActivityFromDayPart(activityId, props.dayPart.id);
}

async function addActivity(): Promise<void> {
  scheduleStore.addActivityToDayPart(props.dayPart.id);

  // Wait for DOM update
  await nextTick();
  const inputEl = activityInputs.value[activityInputs.value.length - 1];
  if (inputEl) {
    inputEl.focusInput();
  }
}

const {debounce} = useDebounce(500);

const updateDescription = debounce((activity: Activity) => {
  scheduleStore.updateDescriptionOfActivity(activity.description, activity.id, props.dayPart.id)
})
</script>

<template>
  <div class="flex flex-col justify-between items-end py-8 h-full">
    <div class="flex flex-col gap-16 w-full">
      <div class="flex flex-col gap-6">
        <BaseTitle size="h4" grey>Eigenschappen</BaseTitle>
        <div class="flex-col flex gap-2">
          <BaseInput is-horizontal type="time" label="Startmoment" v-model="startTime"></BaseInput>
          <BaseInput is-horizontal type="time" label="Eindmoment" v-model="endTime"></BaseInput>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <div class="flex items-center w-full justify-between ">
          <BaseTitle size="h4" grey>Activiteiten</BaseTitle>
          <BaseButton @click="addActivity()" icon>
            <IconPlus size="14"></IconPlus>
          </BaseButton>
        </div>

        <BaseTable>
          <BaseTableHeader>
            <BaseTableRow>
              <BaseTableHead>Beschrijving</BaseTableHead>
              <BaseTableHead>Icoon</BaseTableHead>
              <BaseTableHead>Type</BaseTableHead>
              <BaseTableHead class="w-12"></BaseTableHead>
            </BaseTableRow>
          </BaseTableHeader>
          <BaseTableBody>
            <BaseTableRow v-for="activity of dayPart.activities">

              <BaseTableInput
                  ref="activityInputs"
                  :ref="el => setInputRef(activity.id, el)"
                  @input="updateDescription(activity)"
                  v-model="activity.description"
              />

              <BaseTableCell>
                <IconSelector
                    :selected-icon="activity.icon"
                    :day-part-id="dayPart.id"
                    :activity-id="activity.id">
                </IconSelector>
              </BaseTableCell>
              <BaseTableCell>
                <ActivityTypeSelector
                    :activity-id="activity.id"
                    :day-part-id="dayPart.id"
                    :selected-activity-type="activity.type"
                ></ActivityTypeSelector>
              </BaseTableCell>
              <BaseTableCell class="w-12">
                <BaseButton variant="subtle" icon size="s" @click="removeActivity(activity.id)">
                  <IconTrash size="14"></IconTrash>
                </BaseButton>
              </BaseTableCell>
            </BaseTableRow>
          </BaseTableBody>
        </BaseTable>
      </div>

    </div>

    <BaseButton @click="removeDayPart" icon variant="subtle">
      <IconTrash size="14"></IconTrash>
    </BaseButton>
  </div>

</template>

<style scoped lang="scss">

</style>