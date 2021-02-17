import { createSSRApp } from "vue";
import { createRouter } from "./router";
import App from "./App.vue";

export function createVueApp() {
  const app = createSSRApp(App);
  const router = createRouter();

  app.use(router);
  return { app, router };
}
