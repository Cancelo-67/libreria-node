const express = require('express')
const autorEsquema = require("../modelos/modeloautors")
const router = express.Router();

//Obtener todos los autors
router.get('/autores', async(req,res) => {
    autorEsquema.find()
    .then(autor => res.json(autor))
    .catch(err=> res.json(err))
})

//Obtener solo un autor
router.get('/autores/:id', async (req,res)=>{
    const { id } = req.params;
    autorEsquema
        .findById(id)
        .then(autor => res.json(autor))
        .catch(err=>res.json(err))
});

//Crear autor
router.post('/autores', async (req,res)=>{
    const autor = new autorEsquema(req.body);
    await autor.save()
    res.json(autor);
})

//Actualizar autor por id
router.put('/autores/:id', (req,res)=>{
    const { id } = req.params;
    const { nombre, primerApellido, sedungoApellido, libros, fecha_nac } = req.body;
    autorEsquema
        .updateOne({_id:id},{$set: { nombre, primerApellido, sedungoApellido, libros, fecha_nac }})
        .then((autor)=>res.json(autor))
        .catch(err=>res.json(err))
})

router.delete('/autores/:id', (req,res)=>{
    const { id } = req.params;
    autorEsquema
        .remove({_id: id})
        .then(()=>res.json(autor))
        .catch(err=>res.json(err))
})


module.exports = router;