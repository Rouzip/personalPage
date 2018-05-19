import koaBody from "koa-body";
import Router from "koa-router";
import { reNamePic, teacherInfos, viewPeopleNum, getPic, teacherInfo } from "../controller/apiController";


const router = new Router();

// 使用koa-body进行request解析，解析出文件
router.post(
  "/upload",
  koaBody({
    multipart: true,
    formLimit: 10 * 1024,
    formidable: {
      uploadDir: __dirname + "/../uploads"
    }
  }),
  reNamePic
);
router.get("/teachers", teacherInfos);
router.post('/teacher', teacherInfo);
router.get("/peoples", viewPeopleNum);
router.get('/photos/:name', getPic);

export { router };
