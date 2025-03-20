import { Router } from "express";
import { TodoModel } from "./todoModel";
import { TodoSchemaValid } from "./todoModel";
import { getTodosCtrl,updateTodoCtlr,createTodoCtrl, deleteTodoCtrl } from "./todoController";

const router = Router();

router.get('/',getTodosCtrl)

router.post('/',createTodoCtrl );


router.put('/:id', updateTodoCtlr );

router.delete('/:id',deleteTodoCtrl);

export { router };