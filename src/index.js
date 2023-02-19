const express = require('express');
require('./lib/mongoose')
const rutaUsuarios = require("./routes/rutaUsuarios")
const rutaLibros = require("./routes/rutaLibro")
const rutaAutores = require("./routes/rutaAutor")
const PORT = process.env.PORT || 9000
const app = express();
const conectionBD=require('./lib/mongoose')

//Llamar funcion para conexion mongodb
conectionBD()

//middleware
app.use(express.json());
app.use('/api', rutaUsuarios)
app.use('/api', rutaLibros)
app.use('/api', rutaAutores)



app.get('/', (req,res)=>{
    res.send(" Bienvenido a mi API ")
})


app.listen(PORT, () => console.log(`API iniciada en el puerto ${PORT}`));
