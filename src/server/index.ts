import { createServer as createViteServer, ViteDevServer } from "vite";
import Koa from "koa";
import { readFileSync } from "fs";
import path from "path";
import c2k from "koa-connect";
import KoaRouter from "koa-router";
import compress from "koa-compress";
import koaStatic from "koa-static";
import zlib from "zlib";

const resolve = (r: string) => path.resolve(__dirname, `../../${r}`);

const isProd = process.env.NODE_ENV === "production";

async function createServer() {
  const app = new Koa();
  const router = new KoaRouter();

  const manifest = isProd ? require("../../dist/client/ssr-manifest.json") : {};
  let vite: ViteDevServer;
  let template: string;
  let render: any;
  if (isProd) {
    template = readFileSync(resolve("./dist/client/index.html")).toString();
    render = require("../../dist/server/entry_server.js").render;
    app.use(
      compress({
        filter(content_type) {
          return /(javascript|css|png|jpg|jpeg|svg|html)/i.test(content_type);
        },
        gzip: {
          flush: zlib.constants.Z_SYNC_FLUSH,
        },
        deflate: {
          flush: zlib.constants.Z_SYNC_FLUSH,
        },
      })
    );
    app.use(koaStatic(resolve("./dist/client")));
  } else {
    vite = await createViteServer({
      server: { middlewareMode: true },
    });
    app.use(c2k(vite.middlewares));

    template = readFileSync(resolve("./index.html")).toString();
    render = (await vite.ssrLoadModule(resolve("./src/entry_server.ts")))
      .render;
  }

  app.use(async (ctx) => {
    console.log("收到请求：", ctx.url);
    try {
      const url = ctx.url;

      const { code, html, preloadLinks, context } = await render(url, manifest);
      switch (code) {
        case 200:
          const responseHTML = isProd
            ? template
            : (await vite.transformIndexHtml(url, template))
                .replace("<!--title-->", context.head.title)
                .replace("<!--meta-tags-->", context.head.metas)
                .replace(`<!--preload-links-->`, preloadLinks)
                .replace(`<!--app-html-->`, html)
                .replace(
                  `<!--initial-state-->`,
                  `<script>window.__INITIAL_STATE__=${JSON.stringify(
                    context.state
                  )}</script>`
                );

          ctx.status = code;
          ctx.body = responseHTML;
          break;
        case 404:
          ctx.status = 404;
          ctx.body = "404 Not Found";
          break;
      }
    } catch (err) {
      vite && vite.ssrFixStacktrace(err);
      ctx.status = 500;
      ctx.body = "Server Error";
    }
  });

  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3001, () => {
      console.log("listen on: http://localhost:3001");
    });
}

createServer();
