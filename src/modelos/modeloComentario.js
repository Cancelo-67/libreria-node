const mongoose = require("mongoose");

const comentarioEsquema = mongoose.Schema({
  id_Usuario: String,
  id_Libro: String,
  comentario: String,
});

module.exports = mongoose.model("comentario", comentarioEsquema);
