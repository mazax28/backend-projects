import {z} from 'zod';


const verifyEmailTokenSchema = z.object({
    token: z
      .string()
      .length(6, { message: "El token debe tener exactamente 6 dígitos" })
      .
      regex(/^\d{6}$/, { message: "El token debe contener solo números" }),
  });

const forgotPasswordSchema = z.object({
    email: z.string().email(),
    });


const resetPasswordSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match'});


export { verifyEmailTokenSchema, forgotPasswordSchema, resetPasswordSchema };