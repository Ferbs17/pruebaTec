import  { Task } from "../database/models/index.js";

// Creación de una nueva tarea
// Crear Tarea
export const createTask = async (data, idUser) => {
  try {
    const task = await Task.create({
      Title: data.Titulo,
      Description: data.Resumen,
      ID_user: idUser,
      });
    return task;
  } catch (err) {
   console.error("Error al crear Tarea:", err);
   return false;
  }
};

// Obtenertareas por usuario
export const fetchTasks = async (idUser) => {
  try {
    const task = await Task.findAll({
        attributes: ["ID_task", "Title", "Description", "Status"],
        where: { ID_user: idUser },
      });
    return task;
  } catch (err) {
   console.error("Error al obtener Tareas:", err);
   return false;
  }
};

// Actualización de una tarea
// Actualizar Tarea
export const updateTask = async (data) => {
  try {
    // Buscar la tarea por su id
    const task = await Task.findByPk(data.idTask);
    if (!task) {
      console.error("Tarea no encontrada");
      return false;
    }

    // Actualizar campos (solo los que vienen en data)
    task.Title = data.Titulo ?? task.Title;
    task.Description = data.Resumen ?? task.Description;
    task.Status = data.Estado ?? task.Status;

    await task.save(); // guardar cambios
    return task;
  } catch (err) {
    console.error("Error al actualizar tarea:", err);
    return false;
  }
};

// Borrado de una tarea
// Eliminar Tarea
export const deleteTask = async (idtask) => {
  try {
    const task = await Task.findOne({
      where: { ID_task: idtask },});
    if (!task) {
      console.error("Tarea no encontrada");
      return false;
    }

    await task.destroy(); // eliminar la tarea
    return true;
  } catch (err) {
    console.error("Error al eliminar tarea:", err);
    return false;
  }
};