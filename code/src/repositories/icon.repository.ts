import {Icon} from "@/models/icon.interface";

export function fetchIcons(): Promise<Icon[]> {
    return fetch("/icons/icons.json")
        .then((response) => response.json())
        .then((data) =>
            data.map((icon: any) => ({
                ...icon,
                alternativeNames: icon.alternativeNames.split(",").map((name: string) => name.trim()),
            }))
        );
}