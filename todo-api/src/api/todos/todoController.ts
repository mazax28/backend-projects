import type {Request, Response} from 'express';
import { TodoSchemaValid } from './todoModel';
import { getTodosService, updateTodoService, createTodoService, deleteTodoService } from './todoService';


const  getTodosCtrl = async (req: Request, res: Response) => {
    try{
        const todos = await  getTodosService();
        console.log(todos);
        res.status(200).json({ todos });
    }
    catch(error){
        res.status(400).json({ error: error instanceof Error ? error.message : 'Error al procesar la solicitud' });
    }
}

const createTodoCtrl = async (req: Request, res: Response) => {
    try{
        const newTodo = TodoSchemaValid.parse(req.body);
        const todo = await createTodoService(newTodo);
        res.status(201).json({ todo });
    }
    catch(error){
        res.status(400).json({ error: error instanceof Error ? error.message : 'Error al procesar la solicitud' });
    }

}

const updateTodoCtlr = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const updatedTodo = TodoSchemaValid.parse(req.body);
        const todo = await updateTodoService(id, updatedTodo);
        res.status(200).json({ todo });
    }
    catch(error){
        res.status(400).json({ error: error instanceof Error ? error.message : 'Error al procesar la solicitud' });
    }
}

const deleteTodoCtrl = async (req: Request, res: Response) => {
    try{    
        const {id} = req.params;
        const todo = await deleteTodoService(id);
        res.status(200).json({ todo });
    }
    catch(error){
        res.status(400).json({ error: error instanceof Error ? error.message : 'Error al procesar la solicitud' });
    }
}
export {getTodosCtrl,updateTodoCtlr, createTodoCtrl, deleteTodoCtrl}