import {Activity} from "@/models/activity.interface";

export interface DayPart {
    id: string;
    startTime: Date;
    endTime: Date;
    activities: Activity[];

    selected: boolean;
}