import * as Auth from "../utils/validation.js";
import jwt from "jsonwebtoken";
import * as userController from "../controllers/userControllers.js";

export const login = async(data) => {
try{
  console.log("--------------------Nuevo incio de sesión");
       // Validar usuario y contraseña
    const validated = await Auth.validate(data.Correo, data.Contra);

    if (validated.acceso === true) {
      // Obtener datos del usuario para el token
      const SendTok = await userController.getUserByEmail(data.Correo);

      // Generar JWT
      const token = jwt.sign({ SendTok }, process.env.codigo, {
        expiresIn: "8h",
      });

      return {
        token,
        ID: SendTok.ID_user,
        Nombre: SendTok.Name,
        Correo: SendTok.Email,
      };
    }

    return false; // credenciales inválidas
    
}catch(error) {
  console.error("Error en la función login:", error); 
    return false;
}
};
