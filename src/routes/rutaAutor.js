const express = require('express')
const autorEsquema = require("../modelos/modeloAutor")
const router = express.Router();

//Obtener todos los autores
router.get('/autores', async (req,res) => {
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
    const comprobacionNombre = await autorEsquema.findOne({nombre: autor.nombre})
    const comprobacionApellido1 = await autorEsquema.findOne({primerApellido: autor.primerApellido});
    const comprobacionApellido2 = await autorEsquema.findOne({sedungoApellido: autor.sedungoApellido});
    if (!comprobacionNombre || !comprobacionApellido1 || !comprobacionApellido2) {
        await autor.save()
        res.json(autor);
    } else {
        res.send("Este autor ya esta creado")
    }

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
//Elimina un solo Autor
router.delete('/autores/:id', (req,res)=>{
    const { id } = req.params;
    autorEsquema
        .remove({_id: id})
        .then((autor)=>res.json(autor))
        .catch(()=>res.send('Este autor no se encuentra en la base de datos.'))
})


module.exports = router;