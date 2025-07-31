import { Router } from "express";
import * as loginController from "../controllers/loginControllers.js";
import bcrypt from 'bcrypt';
import * as sanitize from "../utils/sanitize.js";
import * as Auth from "../utils/validation.js";
const router = Router();

//    Login     //
// POST: http://localhost:3005/auth/login
router.post("/login" , async (req, res) => {
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
    const validated = await loginController.login(data);
    if (!validated) {
      return res.status(401).json({
        message: "Credenciales incorrectas",
      });
    }else{
        return res.status(200).json({
      message: "Inicio de sesión exitoso",
      data: validated,
    });
    }

  } catch (error) {
    console.error("Error inesperado en login:", error);
    return res.status(500).json({
      status: 500,
      message: "Error inesperado",
    });
  }
});


// Encripta contraseña demo
router.post("/encrypt", async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "La contraseña es obligatoria" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    return res.status(200).json({ hashedPassword });
  } catch (error) {
    console.error("Error al encriptar contraseña:", error);
    return res.status(500).json({ message: "Error al encriptar contraseña" });
  }
});

export default router;