import { Context } from "koa";
import db from "../model";
import { UserAttributes, UserInstance } from "../model/model";
import { loadPic, reName, userMap } from "./tool";

/**
 * 将tmp文件重命名为用户id图片
 * @param ctx
 */
export async function reNamePic(ctx: Context): Promise<void> {
  // 这里需要从前端传送的body之中取出文件，koa-body成功解析文件
  let file: any = ctx.request.body.files.file;
  let cookie: string = ctx.cookies.get("uuid");
  let id = userMap.get(cookie) || "";
  console.log(userMap);
  console.log("id:", id);
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
