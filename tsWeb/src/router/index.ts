import Router from "koa-router";
import { router as apiRouter } from "./api";
import { router as usrRouter } from "./user";


let router = new Router();
router.get("/", async (ctx, next) => {
  await ctx.render("index");
});

router.use("/api", apiRouter.routes()).use(apiRouter.allowedMethods());
router.use("/user", usrRouter.routes()).use(usrRouter.allowedMethods());

export default router;
