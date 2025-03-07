import express from 'express';
import {prisma} from '../PrismaClient.js';
const router = express.Router();


// Replace both existing router.get('/') handlers with this single one
router.get('/', async (req, res) => {
    let skip = parseInt(req.query.skip);
    let take = parseInt(req.query.take);

    // Si no se envían, Prisma debe ignorarlos
    skip = isNaN(skip) ? undefined : skip;
    take = isNaN(take) ? undefined : take;

    console.log("Skip:", skip, "Take:", take); // Para depurar

    try {
        const clients = await prisma.client.findMany({
            skip,
            take
        });
        res.json({clients});
    } catch (error) {
        res.status(500).json({error: 'Something went wrong'});
    }
});



router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const client = await prisma.client.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.json({client});
    }
    catch (error){
        res.status(500).json({error: 'Something went wrong'});
    }
});



router.post('/', async (req, res) => {
    console.log("Request body:", req.body); // <-- Agregar esto para verificar qué datos llegan al backend

    const {name, email, Job, Rate, Status} = req.body;
    try{
        const newClient = await prisma.client.create({
            data: {
                name: name,
                email: email,
                Job: Job,
                Rate: parseInt(Rate),
                Status: Status
            }
        });
        res.status(201).json({newClient});
    }
    catch (error){
        res.status(500).json({error: 'Something went wrong'});
    }
})
router.put('/:id', async (req, res) => {
    const {name, email, Job, Rate, Status} = req.body;
    console.log("Request body:", req.body); // <-- Agregar esto para verificar qué datos llegan al backend
    console.log("Request params:", req.params); // <-- Agregar esto para verificar qué datos llegan al backend
    const {id} = req.params;
    try{
        const updatedClient = await prisma.client.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: name,
                email: email,
                Job: Job,
                Rate: Rate,
                Status: Status
            }
        });
        res.json({updatedClient});
    }
    catch (error){
        res.status(500).json({error: 'Something went wrong'});
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{    
        await prisma.client.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.json({message: 'Client deleted'});

    }catch (error){
        res.status(500).json({error: 'Something went wrong'});
    }
});

export default router;