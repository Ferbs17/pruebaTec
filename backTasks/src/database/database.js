import { Sequelize } from "sequelize";
import dotenv from "dotenv"; //variables de entorno
//colocar variables de entorno
dotenv.config();

const conexion = new Sequelize(
  process.env.database,
  process.env.user,
  process.env.password,
  {
    host: process.env.hostp,
    dialect: "mysql",
  },
);

export default conexion;