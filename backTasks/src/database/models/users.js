import { DataTypes } from "sequelize";
import conexion from "../database.js";

const User = conexion.define("usuarios", {
  ID_user: {
    type: DataTypes.INTEGER(10),
    primaryKey: true,
    autoIncrement: true,
  },

  Name: {
    type: DataTypes.STRING(40),
  },

  Email: {
    type: DataTypes.STRING(100),
    unique: true,
  },

  Telefono: {
    type: DataTypes.STRING(15),
    unique: true,
  },

  Password: {
    type: DataTypes.STRING(100),
    unique: true,
  },
 
});

export { User };