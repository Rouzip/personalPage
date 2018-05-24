import koaBody from "koa-body";
import Router from "koa-router";
import {
  reNamePic,
  teacherInfos,
  viewPeopleNum,
  teacherInfo
} from "../controller/apiController";

const router = new Router();

// 使用koa-body进行request解析，解析出文件
router.post(
  "/upload",
  koaBody({
    multipart: true,
    formLimit: 10 * 1024,
    formidable: {
      uploadDir: __dirname + "/../static"
    }
  }),
  reNamePic
);
router.get("/teachers", teacherInfos);
router.post("/teacher", teacherInfo);
router.get("/peoples", viewPeopleNum);

export { router };
