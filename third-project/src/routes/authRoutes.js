// authRoutes.js
import express from 'express'; 
import bcrypt from 'bcryptjs';  
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient';  

const router = express.Router();  

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    
    try {
        // Usa la función insertUser desde dbQueries.js
        const newUser = await prisma.user.create({
            data:{
                name: username,
                password: hashedPassword
            }
        })
        console.log('User created with ID:', newUser.id); // Asegúrate de que tenga un valor válido
        if (!newUser || !newUser.id) {
            throw new Error('User creation failed');
        }
        // Usa la función insertTodo para insertar la tarea por defecto
        const defaultTodo = "Hello :) Add your first todo here!";
        const newTodo = await prisma.todo.create({
            data:{
                task: defaultTodo,
                user: {
                    connect: {
                        id: Number(newUser.id)
                    }
                }
            }
        });
        
        // Genera el token y responde
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.json({ token });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(503).json({ error: 'Service Unavailable', message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try{
        const user = await prisma.user.findUnique({
            where: {
                name: username
            }
        });
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
