import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    meta: {
      head: () => ({
        title: "首页",
        metas: [{ name: "description", content: "ZXFAN的首页" }],
      }),
    },
    component: () => import("../views/home.vue"),
  },
  {
    path: "/list",
    meta: {
      head: () => ({
        title: "文章列表",
        metas: [{ name: "description", content: "文章列表页" }],
      }),
    },
    component: () => import("../views/list.vue"),
  },
];

export default routes;
