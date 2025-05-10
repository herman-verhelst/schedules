import {ActivityType} from "@/models/activityType.interface";
import {IconName} from "@/components/base/icon/types/name";

export interface Activity {
    id: string;
    icon: IconName | undefined;
    description: string | undefined;
    type: ActivityType | undefined;
}