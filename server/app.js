import express from 'express';
import morgan from 'morgan';
import { PORT } from './config.js';
import indexRoutes from './routes/index.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import clientesRoutes from './routes/clientes.routes.js'

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use(indexRoutes);
app.use(usuariosRoutes);
app.use(clientesRoutes);

export default app;