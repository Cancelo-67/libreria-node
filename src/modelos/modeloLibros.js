const mongoose = require('mongoose');


const libroEsquema = mongoose.Schema({
    titulo: String,
    descripcion: String,
    imagen: String,
    autor: String,
    año: Number
});

module.exports = mongoose.model('libros', libroEsquema);