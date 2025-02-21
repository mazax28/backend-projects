import express from 'express';  // Importa el paquete Express para crear el servidor
import db from '../db.js';  // Importa la base de datos SQLite

const router = express.Router();  // Crea un enrutador de Express

// Lista todos los todos del usuario logueado
router.get('/', (req, res) => {

})

//Crea un nuevo todo 
router.post('/', (req, res) => {
    
})

router.put('/:id', (req, res) => {

}
)

router.delete('/:id', (req, res) => {

})

export default router;