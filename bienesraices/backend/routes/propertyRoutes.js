const express = require('express');
const Property = require('../models/Property');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre único para cada imagen
  },
});

const upload = multer({ storage });

// Asegúrate de que la carpeta 'uploads' existe
const fs = require('fs');
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Obtener todas las propiedades
router.get('/', async (req, res) => {
  try {
    const properties = await Property.findAll();
    console.log(properties); // Log para verificar si las propiedades se obtienen correctamente
    res.json(properties);
  } catch (error) {
    console.error("Error al obtener propiedades:", error); // Imprime el error completo
    res.status(500).json({ error: 'Error al obtener las propiedades' });
  }
});

// Crear una nueva propiedad con imagen
router.post('/', upload.single('image'), async (req, res) => {
  const { title, price, location, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const property = await Property.create({ title, price, location, description, imageUrl });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la propiedad' });
  }
});

// Eliminar una propiedad
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Property.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la propiedad' });
  }
});

module.exports = router;
