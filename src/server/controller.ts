import KoaRouter from "koa-router";
const router = new KoaRouter();
const controller = new KoaRouter();
import path from "path";

const resolve = (r: string) => path.resolve(__dirname, `../../sources/${r}`);

controller.use("/api", router.routes(), router.allowedMethods());

export default controller;
