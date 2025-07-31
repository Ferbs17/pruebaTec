import { Router } from "express";
import * as Auth from "../utils/validation.js";
import * as sanitize from "../utils/sanitize.js";
import * as userController from "../controllers/userControllers.js";
const router = Router();

//    Create user     //
// POST: http://localhost:3005/users/register
router.post("/register", Auth.Authenticated , async (req, res) => {
  try {
    const data = req.body;
    // Validar datos con tu función sanitize.data (asumo que devuelve errores y valido)
    const { errores, valido } = await sanitize.data(data);

    // Validar campos obligatorios más explícito
    if (!data || !valido || !data.Correo || !data.Contra) {
      if (!data) errores.error = "No se enviaron datos";
      if (!data.Correo) errores.Correo = "El email es obligatorio";
      if (!data.Contra) errores.Contra = "La contraseña es obligatoria";

      return res.status(400).json({
        message: "Los datos ingresados son inválidos",
        error: errores,
      });
    }

    // Si todo está bien, intenta hacer login
    const userCreated = await userController.createUser(data);
    if (!userCreated) {
      return res.status(500).json({
        message: "No fue posible crear el usuario",
      });
    }else{
        return res.status(200).json({
      message: "Usuario creado exitosamente",
      data: userCreated,
    });
    }

  } catch (error) {
    console.error("Error inesperado en creación de usuario:", error);
    return res.status(500).json({
      status: 500,
      message: "Error inesperado",
    });
  }
});

//    Obtener todos los usuarios     //
// GET: http://localhost:3005/users/
router.get("/", Auth.Authenticated , async (req, res) => {
  try {
   
    const users = await userController.getUsers();
    if (users) {
         return res.status(200).json({
      message: "Usuarios obtenidos exitosamente",
      data: users,
    });
      
    }else{
       return res.status(500).json({
        message: "No fue posible obtener los usuarios",
      });
    }

  } catch (error) {
    console.error("Error inesperado en obtener usuarios:", error);
    return res.status(500).json({
      status: 500,
      message: "Error inesperado",
    });
  }
});

export default router;