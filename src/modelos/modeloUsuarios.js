const mongoose = require("mongoose");

const usuarioEsquema = mongoose.Schema({
  nombreusuario: String,
  nombre: String,
  apellido: String,
  email: String,
  edad: Number,
  contraseña: String,
  favoritos: Array,
});

module.exports = mongoose.model("usuario", usuarioEsquema);
