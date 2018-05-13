/// <reference path="./model.d.ts" />

import Sequelize from "sequelize";
import config from "../config";
import { UserInstance, UserAttributes } from "./model";

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 30000,
      acquire: 20000
    }
  }
);

let User = sequelize.define<UserInstance, UserAttributes>(
  "user",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: Sequelize.STRING,
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    telephone: {
      allowNull: false,
      type: Sequelize.STRING
    },
    // 职位
    position: Sequelize.STRING,
    email: Sequelize.STRING,
    // 自我介绍
    introduce: Sequelize.TEXT,
    // 院系
    department: Sequelize.STRING,
    // 相片的UUID
    picture: Sequelize.STRING,
    // 学位
    degree: Sequelize.STRING
  },
  {
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: false
  }
);

let db = {
  sequelize,
  Sequelize,
  User
};

db.sequelize = sequelize;

export default db;
