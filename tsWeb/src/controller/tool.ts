import fs from "fs";
import db from "../model";
import { UserInstance } from "../model/model";

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
    __dirname + "/../uploads/" + id + "a." + file.type.split("/")[1];
  console.log(oldName, picName);
  let user: UserInstance | null = await db.User.findOne({
    where: {
      id: id
    }
  });

  // 更新用户的图片属性，记录图片存储位置
  if (user !== null) {
    await user.updateAttributes({ picture: picName });
  }

  fs.rename(oldName, picName, err => {
    if (err) {
      throw "重命名出错";
    }
    console.log("重命名成功");
  });
}

/**
 * 异步获取图片并返回
 * @param name 存储位置中相片名字
 */
export async function loadPic(name: string) {
  let paths = __dirname + "/../../static/";
  console.log(paths);
  fs.readFile(paths + name, "utf-8", (err, data) => {
    console.log(err)
    if (data !== undefined){
      
    }
  });
}
