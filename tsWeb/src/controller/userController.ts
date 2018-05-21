import { Context } from "koa";

import db from "../model";
import { loginResp } from "./response";
import { UserInstance, UserAttributes } from "../model/model";
import { guid, userMap } from "./tool";

/**
 * 用来判断用户是否存在
 * @param pwd 用户密码
 * @returns 判断用户的结果 boolean
 */
async function checkPwd(
  pwd: string,
  user: UserInstance | null
): Promise<boolean> {
  try {
    // 如果没有该用户，返回错误
    if (user === null) {
      return false;
    }
    // 如果用户密码错误
    if (user.password !== pwd) {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
}

/**
 * 检查用户发送的用户名与密码，返回数据
 * @TODO: 此段只适用于开发检测，成品需要使用短信登录
 * @param ctx {usrName: string, pwd: string}
 */
export async function loginTest(ctx: Context) {
  try {
    let tel: string = ctx.request.body.tel;
    // 找到用户是否存在
    let user: UserInstance | null = await db.User.findOne({
      where: {
        'telephone': tel
      }
    });
    let pwd: string = ctx.request.body.pwd;
    let exist: boolean = await checkPwd(pwd, user);
    let response: loginResp;
    if (exist && user !== null) {
      let cookie = guid();
      // 存储在变量中
      userMap.set(cookie, user.id);
      response = {
        exist: true
      };
      // 将此期间使用的uuid设置在cookie中，方便下次登录
      ctx.cookies.set("uuid", cookie);
    } else {
      response = {
        exist: false
      };
    }
    ctx.response.body = response;
  } catch (error) {
    console.log(error);
  }
}

/**
 * 前端状态记录改变，使其退出
 * @param ctx
 */
export async function logout(ctx: Context) {
  let uuid = ctx.cookies.get("uuid");
  userMap.delete(uuid);
  ctx.response.body = { exit: true };
  // 置空uuid
  ctx.cookies.set("uuid", "");
}

export async function signUp(ctx: Context) {
  // 从前端读取数据，并为其创建唯一uuid
  let usrName: string = ctx.request.body.usrName;
  let pwd: string = ctx.request.body.pwd;
  let tel: string = ctx.request.body.tel;
  let id: string = guid();
  let data = {
    id: id,
    name: usrName,
    password: pwd,
    telephone: tel,
    position: "",
    email: "",
    introduce: "",
    department: "",
    picture: "",
    degree: ""
  };
  // 将用户数据装载进数据库
  try {
    await db.User.create(data);
    ctx.response.body = { success: false };
  } catch (error) {
    ctx.response.body = { success: false };
  }
}
