import {DayPart} from "@/models/dayPart.interface";

export interface Schedule {
    id: string;
    dayParts: DayPart[];
    title: string;
}