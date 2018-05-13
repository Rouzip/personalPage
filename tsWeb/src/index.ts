import Koa, { Context } from "koa";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import views from "koa-views";
import path from "path";
import db from "./model";
import router from "./router";





const app = new Koa();

// 打印日志
app.use(logger());

// 使用模板进行渲染
app.use(
  views(path.join(__dirname, "./views"), {
    extension: "ejs"
  })
);

// 测试用，用于跨域进行前端连接
app.use(async (ctx: Context, next: () => Promise<any>) => {
  ctx.set("Access-Control-Allow-Credentials", "true");
  ctx.set("Access-Control-Allow-Origin", "http://localhost:8080");
  await next();
});

// 中间件的本质还是Promise函数
// https://github.com/xkeshi/ts-koa-middleware-template/blob/master/src/index.ts
app.use(async (ctx: Context, next: () => Promise<any>) => {
  try {
    console.log(ctx.request.url);
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

// 进行json的解析和一般form的解析
app.use(bodyParser());

// 进行数据库的同步
db.sequelize.sync();

// 使用提前指定好的路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
