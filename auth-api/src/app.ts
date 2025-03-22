import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {router as userRoute} from './api/routes/userRoutes';
import {router as authRoute} from './api/routes/authRoutes';

const app = express();

// Logger: Registra las solicitudes antes de modificarlas
app.use(morgan('dev'));
// Seguridad: Helmet antes de CORS para evitar bloqueos
app.use(helmet());
// CORS: Permite solicitudes de otros dominios
app.use(cors());
// JSON Parser: Convierte la cookie en un objeto
app.use(cookieParser());
// JSON Parser: Convierte el cuerpo de las peticiones a JSON
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

export { app };