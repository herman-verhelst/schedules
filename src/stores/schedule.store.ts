import {Schedule} from "@/models/schedule.interface";
import {defineStore} from "pinia";
import {v4 as uuid} from 'uuid'
import {DayPart} from "@/models/dayPart.interface";

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
        addDayPart(): void {
            this.schedule.dayParts.forEach((dayPart: DayPart) => {
                dayPart.selected = false;
            })
            this.schedule.dayParts.push({
                id: uuid(),
                startTime: new Date(),
                endTime: new Date(),
                activities: [],
                selected: true,
            })
        },
        updateDayPart(): void {},
        updateTitle(title: string): void {
            this.schedule.title = title;
        },
        setActiveDayPart(dayPartId: string): void {
            console.log('haha')
            this.schedule.dayParts.forEach((dayPart: DayPart) => {
                dayPart.selected = dayPartId === dayPart.id;
            })
        }
    }
})