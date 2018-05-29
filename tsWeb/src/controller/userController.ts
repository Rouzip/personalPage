import { Context } from "koa";

import db from "../model";
import { loginResp } from "./response";
import { UserInstance, UserAttributes } from "../model/model";
import { guid, userMap, captchaMap } from "./tool";

/**
 * 用户使用短信验证码来登陆
 * @param ctx
 */
export async function login(ctx: Context) {
  let tel = ctx.request.body.tel;
  let pwd = ctx.request.body.pwd;
  let captcha = captchaMap.get(tel);
  let user: UserInstance | null = await db.User.findOne({
    where: {
      telephone: tel
    }
  });
  let response: loginResp;
  // 验证码通过且后端找到了该用户
  if (captcha === pwd && user !== null) {
    let cookie = guid();
    // 存储在变量中
    userMap.set(cookie, user.id);
    console.log("cookie: id", userMap);
    response = {
      exist: true,
      id: user.id
    };
    // 将此期间使用的uuid设置在cookie中，方便下次登录
    ctx.cookies.set("uuid", cookie);
  } else {
    response = {
      exist: false
    };
  }
  ctx.response.body = response;
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

/**
 * 从前端读取数据，并为其创建唯一uuid
 * 需要保证数据库中的电话不重复
 * @param ctx
 */
export async function signUp(ctx: Context) {
  let tel: string = ctx.request.body.tel;
  if (tel.length !== 11) {
    ctx.response.body = { success: false };
    return;
  }
  let infos = await db.User.findAll({ where: { telephone: tel } });
  // 是否存在
  let exist = infos.length !== 0;
  if (!exist) {
    let usrName: string = ctx.request.body.usrName;
    let id: string = guid();
    let data = {
      id: id,
      name: usrName,
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
      ctx.response.body = { success: true };
    } catch (error) {
      console.log(error);
      ctx.response.body = { success: false };
    }
  } else {
    ctx.response.body = { success: false };
  }
}

/**
 * 用户用来修改自己的信息，更新全部的信息
 * @param ctx
 */
export async function modifyInfo(ctx: Context): Promise<void> {
  let id: string = ctx.request.body.id;
  try {
    let user: UserInstance | null = await db.User.findOne({
      where: {
        id: id
      }
    });
    if (user !== null) {
      await user.updateAttributes({
        telephone: ctx.request.body.telephone,
        position: ctx.request.body.position,
        email: ctx.request.body.email,
        department: ctx.request.body.department,
        degree: ctx.request.body.degree,
        introduce: ctx.request.body.introduce
      });
    }
    ctx.response.body = { success: true };
  } catch (error) {
    console.log(error);
    // 修改出错，服务器报错
    ctx.response.body = { success: false };
  }
}
