const express = require('express');
const Property = require('../models/Property');
const Image = require('../models/Image'); // Si tienes un modelo de imágenes relacionado
const router = express.Router();
const multer = require('multer');

// Configuración de multer para la carga de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Crear una nueva propiedad
router.post('/', upload.array('images', 10), async (req, res) => {
  const { title, type, price, location, rooms, bathrooms, amenities, services, description } = req.body;

  try {
    const property = await Property.create({
      title,
      type,
      price,
      location,
      rooms,
      bathrooms,
      amenities: amenities ? JSON.parse(amenities) : [],
      services: services ? JSON.parse(services) : [],
      description,
    });

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

// Obtener todas las propiedades con imágenes
router.get('/', async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [{ model: Image, as: 'images' }]
    });
    res.json(properties);
  } catch (error) {
    console.error("Error al obtener propiedades con imágenes:", error);
    res.status(500).json({ error: 'Error al obtener propiedades' });
  }
});

// Eliminar una propiedad
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Property.destroy({ where: { id } });
    res.status(204).send(); // 204 No Content indica que la eliminación fue exitosa
  } catch (error) {
    console.error("Error al eliminar propiedad:", error);
    res.status(500).json({ error: 'Error al eliminar la propiedad' });
  }
});

// Actualizar una propiedad
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, price, location, rooms, bathrooms, amenities, services, description } = req.body;

    const updatedProperty = await Property.update(
      { 
        title, 
        type, 
        price, 
        location, 
        rooms, 
        bathrooms, 
        amenities: amenities ? JSON.parse(amenities) : [], 
        services: services ? JSON.parse(services) : [], 
        description 
      },
      { where: { id } }
    );

    res.status(200).json({ message: 'Propiedad actualizada correctamente' });
  } catch (error) {
    console.error("Error al actualizar propiedad:", error);
    res.status(500).json({ error: 'Error al actualizar la propiedad' });
  }
});




module.exports = router;








