const express = require("express");
const comentarioEsquema = require("../modelos/modeloComentario");
const router = express.Router();

//Obtener todos los comentarios
router.get("/comentario", async (req, res) => {
  comentarioEsquema
    .find()
    .then((autor) => res.json(autor))
    .catch((err) => res.json(err));
});

//Obtener un solo comentario
router.get("/comentario/:id", async (req, res) => {
  const { id } = req.params;
  comentarioEsquema
    .findById(id)
    .then((comentario) => res.json(comentario))
    .catch((err) => res.json(err));
});

//Crear comentario
router.post("/comentario", async (req, res) => {
  const comentario = new comentarioEsquema(req.body);
  await comentario.save();
  res.json(comentario);
});
//Editar comentario
router.put("/comentario/:id", (req, res) => {
  const { id } = req.params;
  const { id_Usuario, id_Libro, nombre, comentario } = req.body;
  comentarioEsquema
    .updateOne(
      { _id: id },
      {
        $set: { id_Usuario, id_Libro, nombre, comentario },
      }
    )
    .then((comentario) => res.json(comentario))
    .catch((err) => res.json(err));
});

//Elimina un solo Comentario
router.delete("/comentario/:id", (req, res) => {
  const { id } = req.params;
  comentarioEsquema
    .remove({ _id: id })
    .then((comentario) => res.json(comentario))
    .catch(() => res.send("Este autor no se encuentra en la base de datos."));
});

module.exports = router;
