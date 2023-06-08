const mongoose = require("mongoose");

const usuarioEsquema = mongoose.Schema({
  nombreusuario: String,
  nombre: String,
  apellido: String,
  email: String,
  contrasena: String,
  cart: Array,
});

module.exports = mongoose.model("usuario", usuarioEsquema);
