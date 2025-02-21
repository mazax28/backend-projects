// authRoutes.js
import express from 'express'; 
import bcrypt from 'bcryptjs';  
import jwt from 'jsonwebtoken';  
import { insertUser, insertTodo, getUser } from '../db/dbQueries.js';  // Importa las funciones de consultas

const router = express.Router();  

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    
    try {
        // Usa la función insertUser desde dbQueries.js
        const result = insertUser(username, hashedPassword);
        
        // Usa la función insertTodo para insertar la tarea por defecto
        const defaultTodo = "Hello :) Add your first todo here!";
        insertTodo(result.lastInsertRowid, defaultTodo);
        
        // Genera el token y responde
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.json({ token });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(503).json({ error: 'Service Unavailable', message: error.message });
    }
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    try{
        const user = getUser(username);
        if(!user){
            return res.status(404).json({ error: 'User not Found' });
        }
        if(!bcrypt.compareSync(password, user.password)){
            return res.status(401).json({ error: 'Invalid Password' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }); 
        res.json({ token });

    }catch(error){
        console.error('Error during login:', error);
        res.status(503).json({ error: 'Service Unavailable', message: error.message });
    }

});

export default router;
