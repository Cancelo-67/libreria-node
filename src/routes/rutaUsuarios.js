const express = require("express");
const usuarioEsquema = require("../modelos/modeloUsuarios");
const router = express.Router();

//Obtener todos los usuarios
router.get("/usuarios", async (req, res) => {
  usuarioEsquema
    .find()
    .then((usuario) => res.json(usuario))
    .catch((err) => res.json(err));
});

//Obtener solo un usuario
router.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  usuarioEsquema
    .findById(id)
    .then((usuario) => res.json(usuario))
    .catch((err) => res.json(err));
});

//Crear usuario
router.post("/usuarios", async (req, res) => {
  const usuario = new usuarioEsquema(req.body);
  const comprobacionEmail = await usuarioEsquema.findOne({
    email: usuario.email,
  });
  const comprobacionNombreusuario = await usuarioEsquema.findOne({
    nombreusuario: usuario.nombreusuario,
  });
  if (!comprobacionNombreusuario || !comprobacionEmail) {
    await usuario.save();
    res.json(usuario);
  } else {
    res.send("Este nombre ya existe.");
  }
});

//Actualizar usuario
router.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, edad } = req.body;
  usuarioEsquema
    .updateOne({ _id: id }, { $set: { nombre, apellido, edad } })
    .then((usuario) => res.json(usuario))
    .catch((err) => res.json(err));
});
//Elimina un solo usuario
router.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  usuarioEsquema
    .remove({ _id: id })
    .then((usuario) => res.json(usuario))
    .catch((err) => res.json(err));
});

module.exports = router;
