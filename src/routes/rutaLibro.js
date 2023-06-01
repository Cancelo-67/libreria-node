const express = require("express");
const libroEsquema = require("../modelos/modeloLibros");
const router = express.Router();

//Obtener todos los libros
router.get("/libros", async (req, res) => {
  libroEsquema
    .find()
    .then((libro) => res.json(libro))
    .catch((err) => res.json(err));
});

//Obtener solo un libro
router.get("/libros/:id", async (req, res) => {
  const { id } = req.params;
  libroEsquema
    .findById(id)
    .then((libro) => res.json(libro))
    .catch((err) => res.json(err));
});

//Crear libro
router.post("/libros", async (req, res) => {
  const libro = new libroEsquema(req.body);
  await libro.save();
  res.json(libro);
});

//Actualizar libro por id
router.put("/libros/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, imagen, autor, año } = req.body;
  libroEsquema
    .updateOne(
      { _id: id },
      { $set: { titulo, descripcion, imagen, autor, año } }
    )
    .then((libro) => res.json(libro))
    .catch((err) => res.json(err));
});

//Eliminar un libro por la id

router.delete("/libros/:id", (req, res) => {
  const { id } = req.params;
  libroEsquema
    .remove({ _id: id })
    .then((libro) => res.json(libro))
    .catch((err) => res.json(err));
});

module.exports = router;
