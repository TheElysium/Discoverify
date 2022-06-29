import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        alias: "/",
        name: "app",
        component: () => import("./App"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

