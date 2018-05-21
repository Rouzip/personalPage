import db from "./index";
import Sequelize from "sequelize";

export interface UserAttributes {
  id:string;

  name: string;
  password: string;
  telephone: string;
  position: string;
  email: string;
  introduce: string;
  department: string;
  picture: string;
  degree: string;
}

export interface UserInstance extends Sequelize.Instance < UserAttributes >{
  id: string;

  name: string;
  password: string;
  telephone: string;
  position: string;
  email: string;
  introduce: string;
  department: string;
  picture: string;
  degree: string;
}