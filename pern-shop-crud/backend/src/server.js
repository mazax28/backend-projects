import express from 'express';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
const app = express();
const PORT = process.env.PORT || 5000


app.use(express.json())

app.use('/auth', authRoutes);
app.use('/products',productRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})