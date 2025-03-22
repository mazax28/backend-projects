// Looking to send emails in production? Check out our Email API/SMTP product!
import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.TOKEN_MAILTRAP
if (!TOKEN) {
  console.error("Mailtrap token not found in environment variables");
}

export const client = new MailtrapClient({
  token: TOKEN,
  testInboxId: 3547440,
});

export const sender = {
  email: "hello@example.com",
  name: "Mailtrap Test",
};
