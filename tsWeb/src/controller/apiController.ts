import { Context } from "koa";
import db from "../model";
import { UserAttributes, UserInstance } from "../model/model";
import {
  loadPic,
  reName,
  userMap,
  randCaptcha,
  captchaMap,
  sendCaptcha
} from "./tool";

/**
 * 将tmp文件重命名为用户id图片
 * file: 用户的id，用于构建cookie和user的映射
 * @param ctx
 */
export async function reNamePic(ctx: Context): Promise<void> {
  // 这里需要从前端传送的body之中取出文件，koa-body成功解析文件
  let file: any = ctx.request.body.files.file;
  let cookie: string = ctx.cookies.get("uuid");
  let id = userMap.get(cookie) || "";
  await reName(file, id);
  ctx.response.status = 200;
}

/**
 * 获取所有的教师信息
 * @param ctx
 */
export async function teacherInfos(ctx: Context): Promise<void> {
  let teachers: UserAttributes[] = await db.User.findAll();
  ctx.response.body = teachers;
}

/**
 * 获取单个教师的信息
 * id: 查询老师的id
 * @param ctx
 */
export async function teacherInfo(ctx: Context): Promise<void> {
  let id: string = ctx.request.body.id;
  try {
    let user: UserInstance | null = await db.User.findOne({
      where: {
        id: id
      }
    });
    ctx.response.body = user;
  } catch (error) {
    console.log(error);
  }
}

// 计算浏览人数的变量
let num: number = 0;
/**
 * 统计浏览人数，访问一次主页面+1
 * @param ctx
 */
export function viewPeopleNum(ctx: Context): void {
  num++;
  console.log("浏览人数", num);
  ctx.response.body = {
    people: num
  };
}

/**
 * 根据种类找到所有的老师
 * type: 查询的两种方式 group: 名字
 * position: 职位 department: 学院
 * @param ctx
 */
export async function getTeacherGroup(ctx: Context) {
  let group: string = ctx.request.body.group;
  let type: string = ctx.request.body.type;
  if (type === "position") {
    let res = await db.User.findAll({ where: { position: group } });
    ctx.response.body = res;
  } else if (type === "department") {
    let res = await db.User.findAll({ where: { department: group } });
    ctx.response.body = res;
  } else {
    ctx.response.status = 404;
  }
}

/**
 * 使用云片网api发送验证码
 * tel: 用户的手机号码，向api发送的参数之一
 * captcha: 服务器生成的验证码，存储后与tel对应验证登陆
 * @param ctx
 */
export async function captchaControl(ctx: Context) {
  let tel: string = ctx.request.body.tel;
  let captcha: string = randCaptcha() + "";
  let user: UserInstance | null = await db.User.findOne({
    where: {
      telephone: tel
    }
  });
  if (user !== null) {
    captchaMap.set(tel, captcha);
    ctx.response.body = { exist: true };
    console.log("验证码：", captcha);
    // 发送验证码，为了防止后端成为延时，加入到任务队列当中去
    setTimeout(_ => {
      sendCaptcha(tel, captcha).catch(err => {
        console.log(err);
      });
    }, 0);
    // 验证码一分钟有效
    setTimeout(_ => {
      captchaMap.delete(tel);
    }, 1000 * 60);
  } else {
    ctx.response.body = { exist: false };
  }
}
