import express from 'express'; 
import prisma from '../prismaClient.js';

const router = express.Router();  


export default router;


router.get('/', async (req, res) => {
    const products = await prisma.product.findMany();
    res.json({products});

})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const product = await prisma.product.findUnique({
        where:{
            id: parseInt(id)
        }
    });
    res.json(product);
})

router.post('/', async (req, res) => {
    const {name,description,image,price} = req.body;

    const newProduct = await prisma.product.create(
        {
            data:{
                name: name,
                description: description,
                image: image,
                price: Number(price)
            }
        }
    )
    res.json(newProduct);
    
})

router.put('/:id', async (req, res) => {
    const {name,description,image,price} = req.body;
    const {id} = req.params;
    const updateProduct = await prisma.product.update({
        where:{
            id: parseInt(id)
        },
        data:{
            name: name,
            description: description,
            image: image,
            price: price
        }
    });
    res.json(updateProduct);
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const deleteProduct = await prisma.product.delete({
        where:{
            id: parseInt(id)
        }
    });
    res.json(deleteProduct);
    
    
})