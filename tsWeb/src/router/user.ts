import Router from "koa-router";

const router = new Router();

router.get("/login");
router.post("logout");
router.post("/sigup");
router.post("/modify");

export { router };
