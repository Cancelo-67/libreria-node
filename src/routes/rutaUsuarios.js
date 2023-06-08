const express = require("express");
const usuarioEsquema = require("../modelos/modeloUsuarios");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRound = 10;

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
  const { nombreusuario, nombre, apellido, email, contrasena, cart } = req.body;

  const comprobacionEmail = await usuarioEsquema.findOne({ email });
  const comprobacionNombreusuario = await usuarioEsquema.findOne({
    nombreusuario,
  });
  if (!comprobacionNombreusuario || !comprobacionEmail) {
    // Hash de la contraseña
    const hashContrasena = await bcrypt.hash(contrasena, saltRound);
    // Crear el usuario con la contraseña cifrada
    const usuario = new usuarioEsquema({
      nombreusuario,
      nombre,
      apellido,
      email,
      contrasena: contrasena,
      cart,
    });

    await usuario.save();
    res.json(usuario);
  } else {
    res.send("Este nombre de usuario o email ya existe.");
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
    .deleteOne({ _id: id })
    .then((usuario) => res.json(usuario))
    .catch((err) => res.json(err));
});

module.exports = router;
