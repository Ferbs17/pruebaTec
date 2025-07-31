import conexion from "../database.js";
import {User} from "./users.js";
import {Task} from "./tasks.js";

// Definir relaciones
User.hasMany(Task, {
  foreignKey: "ID_user",
  sourceKey: "ID_user",
});
Task.belongsTo(User, {
  foreignKey: "ID_user",
  targetKey: "ID_user",
});

// Exportar los modelos y la conexión
export {
  conexion,
  User,
  Task,
};
