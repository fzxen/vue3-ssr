import { createVueApp } from "./main";
import { renderToString } from "@vue/server-renderer";

interface IManifest {
  [prop: string]: any;
}

export async function render(url: string, manifest: IManifest) {
  const { app, router, store } = createVueApp();
  router.push(url);
  await router.isReady();

  const matchedComponents = router.currentRoute.value.matched.flatMap(
    (record) => Object.values(record.components)
  );
  if (matchedComponents.length <= 0) {
    return { code: 404 };
  }

  await Promise.all(
    matchedComponents.map(
      (com: any) =>
        com.asyncData && com.asyncData({ store, route: router.currentRoute })
    )
  );

  const context = {};
  const html = await renderToString(app, context);
  const preloadLinks = renderPreloadLinks((context as any).modules, manifest);
  Reflect.set(context, "state", store.state);

  return { code: 200, html, preloadLinks, context };
}

function renderPreloadLinks(modules: Array<string>, manifest: IManifest) {
  let links = "";
  const seen = new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file: any) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

function renderPreloadLink(file: any) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else {
    // TODO
    return "";
  }
}
