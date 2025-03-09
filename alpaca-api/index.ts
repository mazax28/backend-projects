import express from "express";
import alpacasRouter  from "./src/routes/alpacasRoutes";
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.use('/alpacas', alpacasRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});