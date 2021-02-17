import {
  createMemoryHistory,
  createWebHistory,
  createRouter as _createRouter,
} from "vue-router";
import routes from "./routes";

export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}
