import express from "express";
import cors from "cors";
import conexion from "./database/database.js"; //conexion a la base de dato
import dotenv from "dotenv"; //variables de entorno

//colocar variables de entorno
dotenv.config();

// Routes
import Login from "./routes/login.js";
import UsersRoutes from "./routes/users.js";
import TaskRoutes from "./routes/task.js";


//import UsersRoutes from
(async () => {
  try {
    await conexion.authenticate();
    await conexion.sync();
    console.log("Conectado a la BD");
  } catch (error) {
    throw new Error(error);
  }
})();

const PORT = process.env.PORT || 3005;

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://www.postman.com",
  ], // Indica el dominio permitido para solicitar recursos
  methods: ["GET", "PUT", "POST", "DELETE"], // Métodos HTTP permitidos
  allowedHeaders: ["Content-Type", "Authorization", "user-agent", "api-key"], // Cabeceras permitidas
  credentials: true, // Permite enviar cookies en las solicitudes
};

app.use(cors(corsOptions));

// Para que reciba los datos en formato JSON
app.use(express.json());

// Routes
//app.use('/.well-known', express.static(path.join(__dirname, '.well-known')));
app.use("/auth", Login);
app.use("/users", UsersRoutes);
app.use("/tasks", TaskRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.locals.users = {};
