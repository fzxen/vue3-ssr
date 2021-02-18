import { createVueApp } from "./main";

const { app, router, store} = createVueApp();

const initalState = (window as any).__INITIAL_STATE__;
if (initalState) {
  store.replaceState(initalState);
}

router.isReady().then(() => {
  app.mount("#app");
});
