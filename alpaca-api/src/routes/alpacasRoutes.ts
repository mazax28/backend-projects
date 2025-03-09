import { Router } from "express";
import {prisma} from "../prismaClient";

const alpacasRouter = Router();


alpacasRouter.get("/", async (req, res) => {
    const alpacas = await prisma.alpaca.findMany();
    res.json({alpacas});
});

alpacasRouter.post("/", async (req, res) => {
    const {name, color} = req.body;
    const newAlpaca = await prisma.alpaca.create({
        data: {
            name,
            color
        }
    });
    res.json({newAlpaca});
  });


alpacasRouter.put("/id", async (req, res) => {
    const {id} = req.params;
    const {name, color} = req.body;
    const updatedAlpaca = await prisma.alpaca.update({
        where:{
            id : parseInt(id)
        },
        data: {
            name,
            color
        }
    });
    res.json({updatedAlpaca});
});

alpacasRouter.delete("/id", async (req, res) => {
    const {id} = req.params;
    const deletedAlpaca = await prisma.alpaca.delete({
        where:{
            id : parseInt(id)
        }
    });
    res.sendStatus(204);
});

export default alpacasRouter;