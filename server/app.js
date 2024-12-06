import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import afiliadosRoutes from "./routes/afiliados.routes.js";
import lugaresRoutes from "./routes/lugar.routes.js";
import negociosRoutes from "./routes/negocios.routes.js";
import loginRoutes from "./routes/login.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";
import cookieParser from "cookie-parser";

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: [
    "http://localhost:5173", // Front local
    "https://main.d3p4ln9e6zhrwe.amplifyapp.com/", // Front desplegado en Render
  ],
  credentials: true,  // Permite el envío de credenciales (cookies, cabeceras de autenticación)
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
};

// Aplica CORS globalmente a todas las rutas
app.use(cors(corsOptions));

// Manejador para todas las solicitudes OPTIONS
app.options('*', cors(corsOptions));  // Responde a todas las solicitudes OPTIONS

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(indexRoutes);
app.use(usuariosRoutes);
app.use(clientesRoutes);
app.use(afiliadosRoutes);
app.use(lugaresRoutes);
app.use(negociosRoutes);
app.use(loginRoutes);
app.use(reviewsRoutes);

export default app;
