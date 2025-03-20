import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import {router as todoRoutes} from './api/todos/todoRoutes';
import {router as authRoutes} from './api/authentication/authenticationRoutes';
import { checkSession } from './middlewares/auth';

const app = express();

// Logger: Registra las solicitudes antes de modificarlas
app.use(morgan('dev'));

// Seguridad: Helmet antes de CORS para evitar bloqueos
app.use(helmet());

// CORS: Permite solicitudes de otros dominios
app.use(cors());

// JSON Parser: Convierte el cuerpo de las peticiones a JSON
app.use(express.json());

app.use(cookieParser());

// Rutas
app.use('/api/todos',checkSession, todoRoutes );
app.use('/api/auth', authRoutes);

export { app };
