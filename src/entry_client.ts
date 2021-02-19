import { createVueApp } from "./main";

const { app, router, store } = createVueApp();

const initalState = (window as any).__INITIAL_STATE__;
if (initalState) {
  store.replaceState(initalState);
}

async function init() {
  await router.isReady();

  app.mixin({
    beforeRouteUpdate(to, from, next) {
      const matched = to.matched.flatMap((record) =>
        Object.values(record.components)
      );
      Promise.all(
        matched.map((c) => {
          const asyncData = (c as any).asyncData;
          if (asyncData) {
            return asyncData({
              store,
              route: to,
            });
          }
        })
      ).finally(next);
    },
  });

  setupRouterBeforeResolve()

  app.mount("#app");
}

function setupRouterBeforeResolve() {
  router.beforeResolve((to, from, next) => {
    const matched = to.matched.flatMap((record) =>
      Object.values(record.components)
    );
    const prevMatched = from.matched.flatMap((record) =>
      Object.values(record.components)
    );

    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    });

    if (activated.length <= 0) next();

    // 这里可以显示加载器
    // const render = createLoading();
    console.log("loading start...", activated);

    Promise.all(
      activated.map((c: any) => {
        if (c.asyncData) return c.asyncData({ store, router: to });
      })
    )
      .then((res) => {
        // TODO 将结果 合并到data选项
      })
      .catch(() => {
        // TODO 跳转到错误页面
      })
      .finally(() => {
        // 这里可以关闭加载器
        // render.hide();
        console.log("loading end");

        next();
      });
  });
}

init();
