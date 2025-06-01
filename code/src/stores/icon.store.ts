import {defineStore} from "pinia";
import {Icon} from "@/models/icon.interface";
import {fetchIcons} from "@/repositories/icon.repository";

interface IconState {
    icons: Icon[];
}

export const useIconStore = defineStore('icon', {
    state: (): IconState => ({
        icons: []
    }),
    actions: {
        fetchIcons(): Icon[] {
            fetchIcons().then((icons: Icon[]) => {
                this.icons = icons;
            });
        }
    }
})