import { z } from 'zod';
import { Schema, model, Model, Types } from 'mongoose';

// Definimos un esquema de validación con Zod para la estructura de un 'Todo'.
// Zod valida los datos antes de que lleguen a la base de datos.
export const TodoSchemaValid = z.object({
  id: z.string().optional(),
  content: z.string(), 
  title: z.string(), 
  completed: z.boolean().default(false), 
});

// Esto nos da la seguridad de tipo en tiempo de compilación.
 // El tipo 'Todo' se infiere a partir del esquema de Zod
type Todo = z.infer<typeof TodoSchemaValid>;

// Definimos el esquema de Mongoose para la colección 'Todo'.
// Este esquema describe cómo los documentos serán almacenados en MongoDB.
const todoSchema = new Schema<Todo>(
  {
    content: { type: String, required: true }, 
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true, 
    versionKey: false, 
  }
);

// Usamos Mongoose para crear el modelo de 'Todo'. El modelo es una representación de la colección de MongoDB y nos permite interactuar con ella.
const TodoModel = model<Todo>('Todo', todoSchema);


export { TodoModel};
export type { Todo };