//Para sanitizar datos y validar datos
import validator from "validator";
//validar correos
import validateGmail from "email-validator";
//encriptar
import crypto from "crypto";

export const data = async (usuario) => {
  //crear variable de errores
  const errores = {};
  //crear validador
  var valido = true;
  try {
    //recorre el objeto donde i es la propiedad del objeto
    for (let i in usuario) {
      if (typeof usuario[i] === "string") {
        switch (i) {
          //comprobar si existe la variable correo
          case "Correo":
            /*validar que sea un correo lo que se envio en caso de no serlo 
                    invalidar "valido" y guardar error*/
            console.log("------------correo");
            break;
          //comprobar si existe la variable Contra
          case "Contra":
            /*validar que la contraseña cumpla con la especificaciones como tener 16 caracteres minimo, 
                    con numeros y caracteres especiales en caso de no serlo invalidar "valido" y guardar error*/
            if (!validator.isLength(usuario.Contra, { min: 12 })) {
              //guardar error
              console.log("-----------La contraseña ingresada no es fuerte");
              errores.Contra = "La contraseña ingresada no es fuerte";
              //invalidar acceso
              valido = false;
            }

            // Expresiones regulares para verificar si la contraseña contiene cada tipo de carácter.
            const tieneMinuscula = /[a-z]/.test(usuario.Contra);
            const tieneMayuscula = /[A-Z]/.test(usuario.Contra);
            const tieneNumero = /[0-9]/.test(usuario.Contra);
            const tieneCaracterEspecial =
              /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(usuario.Contra);

            // Verifica cada criterio y devuelve true si todos se cumplen.
            if (
              !tieneMinuscula ||
              !tieneMayuscula ||
              !tieneNumero ||
              !tieneCaracterEspecial
            ) {
              valido = false;
              console.log("--------------No cumple con las caracteristicas");
              console.log(
                "--------------------Pass incorrecta",
                usuario.Contra,
              );
              errores.Contra = "No es una contraseña fuerte";
            }
            /*sanitizar lo que se envio, es decir, sustituir los caracteres que pueden ser código por su valor html
                    en caso de ser codigo malicioso*/
            //usuario.Contra = validator.escape(usuario.Contra);
            break;
          //comprobar si existe la variable Telefono
          case "Telefono":
            /*validar que sea un Telefono lo que se envio y comprobar que tenga 10 digitos en caso de no ser asi
                    invalidar "valido" y guardar error*/
            console.log("Telefono sin modificar: ", usuario.Telefono);
            usuario.Telefono = usuario.Telefono.replace(/[\s-]/g, "");
            console.log("Telefono modificado: ", usuario.Telefono);
            if (
              !validator.isLength(usuario.Telefono, { min: 10, max: 14 }) ||
              !validator.isMobilePhone(usuario.Telefono, "any")
            ) {
              //guardar error
              console.log("----------------Es invalido el Telefono ingresado");
              (errores.Telefono = "El Telefono ingresado es invalido: "),
                usuario.Telefono;
              //invalidar acceso
              valido = false;
            }
            /*sanitizar lo que se envio, es decir, sustituir los caracteres que pueden ser código por su valor html
                    en caso de ser codigo malicioso*/
            usuario.Telefono = validator.escape(usuario.Telefono);
            break;
  
        } //switch
      }
    } //for
    //enviar los errores que surgieron y el estado de valido
    return { errores, valido };
  } catch (err) {
    valido = false;
    errores.error = "Error al validar sus datos";
    return { errores, valido };
  }
};