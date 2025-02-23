import express from 'express';  // Importa el paquete Express para crear el servidor
import prisma from '../prismaClient';
const router = express.Router();  // Crea un enrutador de Express

// Lista todos los todos del usuario logueado
router.get('/', async (req, res) => {
    console.log(req.userId)
    const {userId} = req;
    const todosUser = await prisma.todo.findMany({
        where: {
            user_id: parseInt(userId)
        }
    });
    res.json(todosUser);

})

//Crea un nuevo todo 
router.post('/', async (req, res) => {
    const {task} = req.body;
    const {userId} = req;

    try{
            const insertTodo = await prisma.todo.create({
                data:{
                    task,
                    completed:false,
                    user_id: parseInt(userId)
                }
            });
            res.status(201).json({id: result.lastInsertRowid, task, completed: 0});
    }
    catch(error){
        console.error('Error during todo creation:', error);
        res.status(503).json({ error: 'Service Unavailable', message: error.message });
    }
        
})

router.put('/:id', async (req, res) => {
    const {newCompleted} = req.body;
    const {todoId} = req.params;
    try{
        const updateTodo =  await prisma.todo.update({
            where:{
                id: parseInt(todoId)
            },
            data:{
                completed: newCompleted
            }
            
        });
        res.json({id, completed});
    }
    catch(error){
        console.error('Error during todo update:', error);
        res.status(503).json({ error: 'Service Unavailable', message: error.message });
    }
}
)

router.delete('/:id', async (req, res) => {
    const {completed} = req.body;
    const {todoId} = req.params;
    console.log(id)
    try{
        const deleteTodo = await prisma.todo.delete({
            where:{
                id: Number(todoId)
            }
        })
        res.json({id});
    }
    catch(error){
        console.error('Error during todo update:', error);
        res.status(503).json({ error: 'Service Unavailable', message: error.message });
    }

})

export default router;