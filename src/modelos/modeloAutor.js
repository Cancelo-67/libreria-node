const mongoose = require("mongoose");

const autorEsquema = mongoose.Schema({
  nombre: String,
  primerApellido: String,
  segundoApellido: String,
  fecha_nac: Date,
});

module.exports = mongoose.model("autores", autorEsquema);
