import { TodoModel} from './todoModel';
import type {Todo} from './todoModel';

const getTodosService = async () => {
    return await TodoModel.find();
}

const createTodoService = async (todo: Todo) => {
    return await TodoModel.create(todo);
}

const updateTodoService = async (id: string, todo: Todo) => {
    return await TodoModel.findByIdAndUpdate(id, todo, {new: true});
}

const deleteTodoService = async (id: string) => {
    return await TodoModel.findByIdAndDelete(id);
}

export {getTodosService, updateTodoService, createTodoService, deleteTodoService}
