import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
const app = express();
const PORT = process.env.PORT || 5000


app.use(cors({
    origin: 'http://localhost:5173' // URL de tu frontend
  }));



app.use(express.json())


app.use('/auth', authRoutes);
app.use('/products',productRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})