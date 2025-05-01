import {createRouter, createWebHistory} from 'vue-router'
import Components from "../views/Components.vue";
import ScheduleCreator from "@/views/ScheduleCreator.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: ScheduleCreator
        },
        {
            path: '/components',
            component: Components
        }
    ]
});

export default router
