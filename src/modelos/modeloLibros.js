const mongoose = require("mongoose");

const libroEsquema = mongoose.Schema({
  titulo: String,
  descripcion: String,
  imagen: String,
  autor: String,
  año: Number,
  genero: String,
  precio: Number,
  cantidad: Number,
});

module.exports = mongoose.model("libros", libroEsquema);
