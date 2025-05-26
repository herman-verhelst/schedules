import {Schedule} from "@/models/schedule.interface";
import {defineStore} from "pinia";
import {v4 as uuid} from 'uuid'
import {DayPart} from "@/models/dayPart.interface";
import {addHours, compareAsc} from "date-fns";
import {Icon} from "@tabler/icons-vue";
import {ActivityType} from "@/models/activityType.interface";

interface ScheduleState {
    schedule: Schedule;
}

export const useScheduleStore = defineStore('schedule', {
    state: (): ScheduleState => ({
        schedule: {
            id: uuid(),
            dayParts: []
        }
    }),
    actions: {
        addDayPart(inFront: boolean): void {
            // Remove selected
            this.schedule.dayParts.forEach((dayPart: DayPart) => {
                dayPart.selected = false;
            })

            // Calculate start and end time
            const startTime = new Date();
            const endTime = new Date();
            if (this.schedule.dayParts.length < 1) {
                startTime.setHours(8, 0, 0, 0);
                endTime.setHours(9, 0, 0, 0);
            } else if (inFront) {
                const firstDayPart = this.schedule.dayParts[0];
                startTime.setTime(addHours(new Date(firstDayPart.startTime).getTime(), -1))
                endTime.setTime(new Date(firstDayPart.startTime).getTime())
            } else {
                const lastDayPart = this.schedule.dayParts[this.schedule.dayParts.length - 1];
                startTime.setTime(new Date(lastDayPart.endTime).getTime())
                endTime.setTime(addHours(new Date(lastDayPart.endTime).getTime(), 1))
            }

            // Add new day part
            this.schedule.dayParts.push({
                id: uuid(),
                startTime: startTime,
                endTime: endTime,
                activities: [
                    {id: uuid(), description: '', icon: 'empty'}
                ],
                selected: true,
            })

            // Sort day parts
            this.schedule.dayParts.sort((a, b) => compareAsc(a.startTime, b.startTime));
        },
        removeDayPart(dayPartId: string): void {
            const index = this.schedule.dayParts.findIndex((dayPart) => dayPart.id === dayPartId)
            this.schedule.dayParts.splice(index, 1);
            const dayPartsLength = this.schedule.dayParts.length
            if (dayPartsLength === 0) return;
            if (dayPartsLength === index) this.schedule.dayParts[index - 1].selected = true
            else this.schedule.dayParts[index].selected = true;
        },
        updateTime(dayPartId: string, time: Date, moment: 'start' | 'end'): void {
            const dayPart = this.schedule.dayParts.find((dayPart: DayPart) => dayPart.id === dayPartId)
            if (moment === 'start') dayPart.startTime = time;
            else dayPart.endTime = time;
        },
        updateTitle(title: string): void {
            this.schedule.title = title;
        },
        setActiveDayPart(dayPartId: string): void {
            this.schedule.dayParts.forEach((dayPart: DayPart) => {
                dayPart.selected = dayPartId === dayPart.id;
            })
        },
        addActivityToDayPart(dayPartId: string): void {
            this.schedule.dayParts
                .find((dayPart) => dayPart.id === dayPartId)
                .activities.push({id: uuid(), description: '', icon: 'empty'})
        },
        removeActivityFromDayPart(activityId: string, dayPartId: string): void {
            const dayPart = this.schedule.dayParts.find((dayPart) => dayPart.id === dayPartId);
            const index = dayPart.activities.findIndex((activity) => activity.id === activityId);
            dayPart.activities.splice(index, 1);
        },
        updateIconOfActivity(icon: Icon, activityId: string, dayPartId: string): void {
            this.schedule.dayParts
                .find((dayPart) => dayPart.id === dayPartId)
                .activities
                .find((activity) => activity.id === activityId)
                .icon = icon;
        },
        updateDescriptionOfActivity(description: string, activityId: string, dayPartId: string): void {
            this.schedule.dayParts
                .find((dayPart) => dayPart.id === dayPartId)
                .activities
                .find((activity) => activity.id === activityId)
                .description = description;
        },
        updateActivityTypeOfActivity(type: ActivityType, activityId: string, dayPartId: string): void {
            this.schedule.dayParts
                .find((dayPart) => dayPart.id === dayPartId)
                .activities
                .find((activity) => activity.id === activityId)
                .type = type;
            console.log(this.schedule)
        }
    }
})