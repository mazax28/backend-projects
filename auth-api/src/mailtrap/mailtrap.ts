import { MailtrapClient } from "mailtrap";
const TOKEN = "756ea0ecdfe44daf6a375702a0095241";

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};


export {client, sender};