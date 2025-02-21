import express from 'express';  // Importa el paquete Express para crear el servidor
import bcrypt from 'bcryptjs';  // Importa el paquete bcrypt para encriptar contraseñas'
import jwt from 'jsonwebtoken';  // Importa el paquete jsonwebtoken para crear tokens JWT
import db from '../db.js';  // Importa la base de datos SQLite

const router = express.Router();  // Crea un enrutador de Express

router.post('/register', (req,res)=>{
    res.status(200).send('register')
})
router.post('/login',(req,res)=>{
    res.status(200).send('login')
})



export default router;