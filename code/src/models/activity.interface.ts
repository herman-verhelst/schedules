import {ActivityType} from "@/models/activityType.interface";
import {Icon} from "@/models/icon.interface";

export interface Activity {
    id: string;
    icon: Icon | undefined;
    description: string | undefined;
    type: ActivityType | undefined;
}