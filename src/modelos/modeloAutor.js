const mongoose = require('mongoose');



const autorEsquema = mongoose.Schema({
    nombre: String,
    primerApellido: String,
    segundoApellido: String,
    fecha_nac: Date,
    idLibro: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Libros'}]
});

module.exports = mongoose.model('autores', autorEsquema);