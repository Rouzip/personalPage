import { Context } from "koa";
import db from "../model";
import { UserAttributes, UserInstance } from "../model/model";
import { loadPic, reName, userMap } from "./tool";

/**
 * 将tmp文件重命名为用户id图片
 * @param ctx
 */
export async function reNamePic(ctx: Context) {
  // 这里需要从前端传送的body之中取出文件，koa-body成功解析文件
  let file: any = ctx.request.body.files.file;
  let cookie: string = ctx.cookies.get("uuid");
  let id = userMap.get(cookie) || "";
  console.log("id:", id);
  await reName(file, id);
  ctx.response.status = 200;
}

/**
 * 获取所有的用户信息
 * @param ctx
 */
export async function teacherInfos(ctx: Context) {
  let teachers: UserAttributes[] = await db.User.findAll();
  ctx.response.body = teachers;
}

/**
 * 用户用来修改自己的信息，原信息保存在客户端
 * @param ctx
 */
export async function modifyInfo(ctx: Context) {
  let id: string = ctx.request.body.id;
  let model: string = ctx.request.body.model;
  let data: string = ctx.request.body.data;
  try {
    let user: UserInstance | null = await db.User.findOne({
      where: {
        id: id
      }
    });
    if (user !== null) {
      await user.updateAttributes({
        model: data
      });
    }
  } catch (error) {
    console.log(error);
    // 修改出错，服务器报错
    ctx.response.status = 500;
  }
}

let num: number = 0;
export function viewPeopleNum(ctx: Context) {
  num++;
  console.log("浏览人数", num);
  ctx.response.body = {
    people: num
  };
}

export async function getPic(ctx: Context) {
  let photoName: string | undefined = ctx.request.url.split("/").pop();
  if (photoName !== undefined){
    await loadPic(photoName);
  }
  ctx.response.status = 200
}
