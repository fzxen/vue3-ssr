import { createSSRApp } from "vue";
import { createRouter } from "./router";
import { createStore } from './store'
import App from "./App.vue";

export function createVueApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  const store = createStore()

  app.use(router).use(store);
  return { app, router, store };
}
