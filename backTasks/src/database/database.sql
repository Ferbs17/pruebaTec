-- Crear la base de datos
CREATE DATABASE taskmanager;

-- Crear usuario y otorgar permisos
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'technicalDB2025';
GRANT ALL PRIVILEGES ON taskmanager.* TO 'admin'@'localhost';

-- Seleccionar la base de datos para trabajar con ella
USE taskmanager;

-- Crear la tabla usuarios
CREATE TABLE `usuario` (
  `ID_user` INT(10) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(40),
  `Email` VARCHAR(100) UNIQUE,
  `Telefono` VARCHAR(15) UNIQUE,
  `Password` VARCHAR(100) UNIQUE,
  PRIMARY KEY (`ID_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Crear la tabla de tareas
CREATE TABLE `task` (
  `ID_task` INT(10) NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(40),
  `Description` VARCHAR(100),
  `Status` TINYINT(1) DEFAULT 0,
  `ID_user` INT(10) NOT NULL,
  PRIMARY KEY (`ID_task`),
  FOREIGN KEY (`ID_user`) REFERENCES `usuario`(`ID_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar usuario de prueba
-- contraseña: admin_Pwd_25
INSERT INTO usuarios (Name, Email, Telefono, Password, createdAt, updatedAt)
VALUES ('Administrador', 'admin@example.com', "525528635899", '$2b$10$lxb4ZY.JHYmCtv1lQxJ6X.cyeglgF1NFqqP5ArrsV4pOInuOIOnX.', now(), now());
