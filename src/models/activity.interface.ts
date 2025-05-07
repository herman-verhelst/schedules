import {ActivityType} from "@/models/activityType.interface";

export interface Activity {
    id: string;
    icon: string | undefined;
    description: string | undefined;
    type: ActivityType | undefined;
}