import {client,sender } from "./mailtrap";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates";
const sendVerificationEmail = async (email: string, token: string) => {
    const recipient = [{ email }];
    try{
        const response = await client.send({
            to: recipient,
            from: sender,
            subject: "Verify Your Email Address",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token),
            category: "verification email",
        });
        console.log(`Verification email sent to ${email}: ${response}`);

    }
    catch(err){
        throw new Error(`Error sending verification email: ${err}`);
    }
}

const sendWelcomeEmail = async (email: string, userName: string) => {
    const recipient = [{ email }];
    
    // Aquí estamos pasando el nombre del usuario y otras posibles variables
    try {
        const response = await client.send({
            to: recipient,
            from: sender,
            subject: "Welcome to Our Service!",
            html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", userName), // Reemplazamos el {userName} en el template
            category: "welcome email", // Categoría apropiada para el correo de bienvenida
        });


    } catch (err) {
        // Manejo de errores más detallado
        console.error(`Error sending welcome email to ${email}:`, err);
    }
};


const sendResetPasswordEmail = async (email:string, resetToken:string) => {
    const recipient = [{ email }];
    try {
        const response = await client.send({
            to: recipient,
            from: sender,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetToken}", resetToken),
            category: "password reset email",
        });
        console.log(`Password reset email sent to ${email}: ${response}`);
    } catch (err) {
        throw new Error(`Error sending password reset email: ${err}`);
    }
};

const sendResetPasswordSuccesEmail = async (email:string, resetToken:string) => {
    const recipient = [{ email }];
    try {
        const response = await client.send({
            to: recipient,
            from: sender,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "password reset email",
        });
        console.log(`Password reset email sent to ${email}: ${response}`);
    } catch (err) {
        throw new Error(`Error sending password reset email: ${err}`);
    }
};


export { sendVerificationEmail,sendWelcomeEmail,sendResetPasswordEmail };