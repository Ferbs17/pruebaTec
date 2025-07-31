import  { User } from "../database/models/index.js";
import bcrypt from 'bcrypt';

// Creación de un nuevo usuario
// Crear usuario
export const createUser = async (data) => {
  try {
    const user = await User.create({
      Name: data.Nombre,
      Email: data.Correo,
      Telefono: data.Telefono,
      Password: bcrypt.hashSync(data.Contra, 10), // Encriptar contraseña
      });
    return user;
  } catch (err) {
   console.error("Error al crear usuario:", err);
   return false;
  }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
         attributes: ['ID_user', 'Name', 'Email'], 
    });
    return users;
  } catch (err) {
       console.error("Error al obtener usuarios:", err);
   return false;
  }
};

// Traer Usuario mediante correo

export const getUserByEmail = async (mail) => {
  try {
    // Busca usuarios en BD
    const result = await User.findOne({
        attributes: ['ID_user', 'Name', 'Email'], 
      where: {Email: mail},     
    });
    return result;
  } catch (error) {
    console.error("Error en función repeat:", error);
    return false;
  }
};



// Usuario existente en BD

export const exist = async (mail) => {
  try {
    // Busca usuarios en BD
    const result = await User.findOne({
      attributes: ['Password'],  
      where: {Email: mail},     
    });
    return result;
  } catch (error) {
    console.error("Error en función repeat:", error);
    return false;
  }
};
