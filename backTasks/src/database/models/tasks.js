import { DataTypes, TINYINT } from "sequelize";
import conexion from "../database.js";
import { User } from "./users.js";

const Task = conexion.define("tareas", {
  ID_task: {
    type: DataTypes.INTEGER(10),
    primaryKey: true,
    autoIncrement: true,
  },

  Title: {
    type: DataTypes.STRING(40),
  },

  Description: {
    type: DataTypes.STRING(100),
  },

  Status: {
    type: DataTypes.TINYINT(1),
    defaultValue: 0, // 0 for pending, 1 for completed
  },

   ID_user: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  }
 
});

// Relación
Task.belongsTo(User, {
  foreignKey: "ID_user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Task, { foreignKey: "ID_user" });

export { Task };