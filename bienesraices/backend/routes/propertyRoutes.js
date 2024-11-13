// routes/propertyRoutes.js
const express = require('express');
const Property = require('../models/property');
const Image = require('../models/Image');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Obtener todas las propiedades junto con sus imágenes
router.get('/', async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [{ model: Image, as: 'images' }],
    });
    res.json(properties);
  } catch (error) {
    console.error("Error al obtener propiedades:", error);
    res.status(500).json({ error: 'Error al obtener las propiedades' });
  }
});

// Crear una nueva propiedad con múltiples imágenes
router.post('/', upload.array('images', 10), async (req, res) => {
  const { title, price, location, description } = req.body;

  try {
    const property = await Property.create({ title, price, location, description });

    if (req.files) {
      const imageRecords = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        propertyId: property.id,
      }));
      await Image.bulkCreate(imageRecords);
    }

    res.status(201).json(property);
  } catch (error) {
    console.error("Error al crear la propiedad:", error);
    res.status(500).json({ error: 'Error al crear la propiedad' });
  }
});

// Eliminar una propiedad y sus imágenes asociadas
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Image.destroy({ where: { propertyId: id } });
    await Property.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar la propiedad:", error);
    res.status(500).json({ error: 'Error al eliminar la propiedad' });
  }
});

module.exports = router;


