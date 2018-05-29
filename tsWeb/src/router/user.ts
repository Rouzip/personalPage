import Router from "koa-router";

import {
  logout,
  signUp,
  modifyInfo,
  login
} from "../controller/userController";

const router = new Router();

router.post("/login", login);
router.get("/logout", logout);
router.post("/signup", signUp);
router.post("/modify", modifyInfo);

export { router };
