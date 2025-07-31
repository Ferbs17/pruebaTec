//json web tokens
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userController from "../controllers/userControllers.js";


//Autentica a los usuarios mientras esten dentro del sitio
//palabra clave: codigo
export const Authenticated = async (req, res, next) => {
  try {
    //verificar token
    console.log("Verificando token de usuario");
    const token = req.headers["authorization"];
    if (!token) {
      // envia error
      console.log("No se envio token");
      return res.sendStatus(401);
    } else {
      //verifica token
      const verify = await jwt.verify(
        token,
        process.env.codigo,
        (err, decoded) => {
          if (err) {
            throw {
              //en caso de error envia estado 403 (sin acceso)
              status: 403,
              message: "Acceso Denegado",
            };
          } else {
            console.log("Token verificado correctamente");
            //verificacion exitosa
            req.correo = decoded.SendTok.Email;
            req.idUser = decoded.SendTok.ID_user;
            next();
              
              
          }
        },
      );
    } //fallo en autenticacion
  } catch (error) {
    res.json(error);
  } //*/
};

// Validación de usuarios
export const validate = async (user, password) => {
  //valida contraseñas
  //busca la contraseña actual
  const found = await userController.exist(user);

  if (found) { //si hay un correo guardado?   
      //definir variables de exito y fracaso
      const exito = { acceso: true, message: "solicitud procesada" };
      const fracaso = { acceso: false, message: "datos incorrectos" };
      console.log("Validando usuario:", found.Password);
      //para validar contraseña
      const access1 = bcrypt.compareSync(password, found.Password); //compara contraseña

        if (access1) {
          return exito;
        } else {
          return fracaso;
        } //verifica si el accesso es valido

  } else {
    return { acceso: false, message: "No existe el usuario especificado" };
  }
};