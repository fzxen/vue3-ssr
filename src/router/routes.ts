import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/list",
    component: () => import("../views/list.vue"),
  },
];

export default routes;
