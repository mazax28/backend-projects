// Importamos los módulos necesarios de Node.js
import express from 'express';  // Importa el paquete Express para crear el servidor
import path, { dirname } from 'path';  // Importa el módulo path para manejar rutas de archivos
import { fileURLToPath } from 'url';  // Importa fileURLToPath para convertir la URL de la ruta de archivo
import authRoutes from './routes/authRoutes.js';  // Importa el enrutador de autenticación

// Inicializa la aplicación de Express
const app = express();

// Define el puerto donde el servidor estará escuchando, usa el valor de la variable de entorno PORT o 3000 por defecto
const PORT = process.env.PORT || 3000

// `__filename` representa la ruta completa del archivo actual
const __filename = fileURLToPath(import.meta.url);

// `__dirname` obtiene el directorio donde se encuentra el archivo actual
const __dirname = dirname(__filename);

// Middleware que sirve archivos estáticos (como CSS, JS, imágenes) desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Middleware que permite procesar cuerpos de solicitud en formato JSON
app.use(express.json())

// Define una ruta para el endpoint raíz ('/')
app.get('/', (req, res) => {
    // Responde enviando el archivo 'index.html' ubicado en la carpeta 'public' dentro del directorio actual
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use('/auth', authRoutes);


// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
    // Imprime un mensaje en la consola cuando el servidor está en funcionamiento
    console.log(`Server is running on port ${PORT}`)
})
