// Import express
const express = require('express');

const data = require('./data.json')
// Initialize the app
const app = express();

const PORT = 3000;

// HTTP VERBS && ROUTES
app.get('/',(req,res)=>{
    console.log('hola')
    res.status(200).send('Hello World')
})

app.get('/dashboard',(req,res)=>{
    res.status(200).send('<h1>Dashboard</h1>')
})

app.use(express.json()); // ✅ Middleware para procesar JSON


app.get('/api/data',(req,res)=>{
    res.status(200).json(data)
})

app.post('/api/data',(req,res)=>{
    const newData = req.body
    data.users.push(newData)
    res.status(201).json(newData)
})

app.delete('/api/data', (req, res) => {
    const deletedUser = data.users.pop(); // Guarda el usuario eliminado
    res.status(200).json({ message: "Último usuario eliminado", deletedUser });
});



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
}
)

