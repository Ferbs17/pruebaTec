import { Router } from "express";
import * as Auth from "../utils/validation.js";
import* as taskController from "../controllers/taskControllers.js";

const router = Router();

//    Create Task     //
// POST: http://localhost:3005/tasks
router.post("/", Auth.Authenticated , async (req, res) => {
  try {
    const data = req.body;
    const taskCreated = await taskController.createTask(data, req.idUser);
    if (!taskCreated) {
      return res.status(500).json({
        message: "No fue posible crear la tarea",
      });
    }else{
        return res.status(200).json({
      message: "Tarea creado exitosamente",
      data: taskCreated,
    });
    }

  } catch (error) {
    console.error("Error inesperado en creación de Tarea:", error);
    return res.status(500).json({
      status: 500,
      message: "Error inesperado",
    });
  }
});

//    Obtener todos los usuarios     //
// GET: http://localhost:3005/tasks/
router.get("/", Auth.Authenticated , async (req, res) => {
  try {
   
    const tasks = await taskController.fetchTasks(req.idUser);
    if (tasks) {
         return res.status(200).json({
      message: "Tareas obtenidas exitosamente",
      data: tasks,
    });
      
    }else{
       return res.status(500).json({
        message: "No fue posible obtener las tareas",
      });
    }

  } catch (error) {
    console.error("Error inesperado en obtener tareas:", error);
    return res.status(500).json({
      status: 500,
      message: "Error inesperado",
    });
  }
});

//    Update Task     //
// POST: http://localhost:3005/tasks
router.put("/", Auth.Authenticated , async (req, res) => {
  try {
    const data = req.body;
    const taskupdated = await taskController.updateTask(data);
    if (!taskupdated) {
      return res.status(500).json({
        message: "No fue posible actualizar la tarea",
      });
    }else{
        return res.status(200).json({
      message: "Tarea actualizada exitosamente",
      data: taskupdated,
    });
    }

  } catch (error) {
    console.error("Error inesperado en actualización de Tarea:", error);
    return res.status(500).json({
      status: 500,
      message: "Error inesperado",
    });
  }
});

//    Delete Task     //
// POST: http://localhost:3005/tasks
router.delete("/", Auth.Authenticated , async (req, res) => {
  try {
    const data = req.body;
    const taskdeleted = await taskController.deleteTask(data.idTask);
    if (!taskdeleted) {
      return res.status(500).json({
        message: "No fue posible eliminar la tarea",
      });
    }else{
        return res.status(200).json({
      message: "Tarea eliminada exitosamente",
    });
    }

  } catch (error) {
    console.error("Error inesperado en eliminación de Tarea:", error);
    return res.status(500).json({
      status: 500,
      message: "Error inesperado",
    });
  }
});
export default router;