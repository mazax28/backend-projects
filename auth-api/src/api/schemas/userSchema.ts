import {z} from 'zod';


const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    name: z.string().min(2, 'First name must be at least 2 characters long'),
})

type UserCreate = z.infer<typeof createUserSchema>;

export {createUserSchema}
export type {UserCreate}