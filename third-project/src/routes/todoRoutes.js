import express from 'express';  // Importa el paquete Express para crear el servidor
import db from '../db/db.js';  // Importa la base de datos SQLite
import { insertTodo } from '../db/dbQueries.js';

const router = express.Router();  // Crea un enrutador de Express

// Lista todos los todos del usuario logueado
router.get('/', (req, res) => {
    console.log(req.userId)
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');
    const todos = getTodos.all(req.userId);
    res.json(todos);

})

//Crea un nuevo todo 
router.post('/', (req, res) => {
    const {task} = req.body;
    const {userId} = req;

    try{
            const insertodo = db.prepare('INSERT INTO todos (user_id, task,completed) VALUES (?, ?, ?)');
            const result = insertodo.run(userId
            , task, 0);
            res.status(201).json({id: result.lastInsertRowid, task, completed: 0});
    }
    catch(error){
        console.error('Error during todo creation:', error);
        res.status(503).json({ error: 'Service Unavailable', message: error.message });
    }
        
})

router.put('/:id', (req, res) => {
    const {completed} = req.body;
    const {id} = req.params;
    try{
        const updateTodo = db.prepare('UPDATE todos SET completed = ? WHERE id = ?');
        const result = updateTodo.run(completed, id);
        res.json({id, completed});
    }
    catch(error){
        console.error('Error during todo update:', error);
        res.status(503).json({ error: 'Service Unavailable', message: error.message });
    }
}
)

router.delete('/:id', (req, res) => {
    const {completed} = req.body;
    const {id} = req.params;
    console.log(id)
    try{
        const deleteTodo = db.prepare('DELETE FROM todos WHERE id = ?');
        const result = deleteTodo.run(id);
        res.json({id});
    }
    catch(error){
        console.error('Error during todo update:', error);
        res.status(503).json({ error: 'Service Unavailable', message: error.message });
    }

})

export default router;