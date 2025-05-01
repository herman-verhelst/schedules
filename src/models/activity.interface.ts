import {ActivityType} from "@/models/activityType.interface";

export interface Activity {
    id: string;
    icon: string;
    type: ActivityType;
}