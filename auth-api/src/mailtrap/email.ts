import { client,sender } from "./mailtrap";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates";
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

export { sendVerificationEmail };