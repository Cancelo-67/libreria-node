const mongoose = require('mongoose');


const libroEsquema = mongoose.Schema({
    titulo: String,
    descripcion: String,
    imagen: String,
    autor: String,
    año: Number,
    idAutor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Autor'}]
});

module.exports = mongoose.model('libros', libroEsquema);