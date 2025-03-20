import {z} from 'zod';
import {Schema, model, Model, Types} from 'mongoose';

const RegisterSchemaValid = z.object({
    name: z.string().min(2,"El nombre debe tener como minimo 2 caracteres"),
    email: z.string().email("El email debe ser valido"),
    password: z.string().min(6,"La contraseña debe tener como minimo 6 caracteres"),
})

const LoginSchemaValid = z.object({
    email: z.string().email("El email debe ser valido"),
    password: z.string().min(6,"La contraseña debe tener como minimo 6 caracteres")
})

type Register = z.infer<typeof RegisterSchemaValid>;
type Login = z.infer<typeof LoginSchemaValid>;

const userSchema = new Schema<Register>(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const userModel: Model<Register> = model('User', userSchema);
export {RegisterSchemaValid, LoginSchemaValid, userModel};
export type {Register, Login};