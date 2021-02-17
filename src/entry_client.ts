import { createVueApp } from "./main";

const { app, router } = createVueApp();

router.isReady().then(() => {
  app.mount("#app");
});
