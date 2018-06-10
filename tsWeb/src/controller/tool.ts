import fs from "fs";

import axios from "axios";
import qs from "qs";

import db from "../model";
import { UserInstance } from "../model/model";
import config from "../config";

/**
 * 自定义函数创建uuid
 */
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

/**
 * 生成四位随机数
 */
export function randCaptcha() {
  return Math.floor(Math.random() * (9999 - 1000)) + 1000;
}

/**
 * 用来进行session管理
 * {cookie, id}
 */
export let userMap: Map<string, string> = new Map<string, string>();

/**
 * 获取上传文件的后缀名
 * @param fileName 上传文件名
 * @returns 文件后缀名
 */
function getSuffixName(fileName: string): string {
  let nameList = fileName.split(".");
  return nameList[nameList.length - 1];
}

/**
 * 完成用户图片修改记录到数据库
 * @param file 用户上传头像文件信息
 * @param id 用户uuid
 * @returns Promise
 */
export async function reName(file: any, id: string): Promise<void> {
  let oldName: string = file.path;
  // 拼接好指定的文件
  let picName: string =
    __dirname + "\\..\\static\\" + id + "." + file.type.split("/")[1];
  let dataPicName: string = id + "." + file.type.split("/")[1];
  console.log(oldName, picName);
  let user: UserInstance | null = await db.User.findOne({
    where: {
      id: id
    }
  });

  // 更新用户的图片属性，记录图片存储位置
  if (user !== null) {
    await user.updateAttributes({ picture: dataPicName });
  }

  try {
    fs.rename(oldName, picName, err => {
      if (err) {
        throw "重命名出错";
      }
      console.log("重命名成功");
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * 异步获取图片并返回
 * @param name 存储位置中相片名字
 */
export async function loadPic(name: string) {
  let paths = __dirname + "/../../static/";
  console.log(paths);
  fs.readFile(paths + name, "utf-8", (err, data) => {
    console.log(err);
    if (data !== undefined) {
    }
  });
}

/**
 * 用户手机号码与验证码的对应
 * {telephone: cpatcha}
 */
export let captchaMap: Map<string, string> = new Map<string, string>();

/**
 * 异步调用云片网的api，发送验证码短信
 * @param tel 手机号码
 * @param cpatcha 验证码
 */
export async function sendCaptcha(tel: string, captcha: string) {
  let message = `【Rouzip的家】您的验证码是${captcha}。如非本人操作，请忽略本短信`;
  await axios.post(
    "https://sms.yunpian.com/v2/sms/single_send.json",
    qs.stringify({
      apikey: config.apikey,
      mobile: tel,
      text: message
    })
  );
}
