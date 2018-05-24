import Router from "koa-router";
import {
  loginTest,
  logout,
  signUp,
  modifyInfo
} from "../controller/userController";

const router = new Router();

router.post("/login", loginTest);
router.get("/logout", logout);
router.post("/sigup", signUp);
router.post("/modify", modifyInfo);

export { router };
