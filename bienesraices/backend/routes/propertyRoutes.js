const express = require('express');
const { Sequelize } = require('sequelize');
const Property = require('../models/Property');
const Image = require('../models/Image'); // Modelo de imágenes relacionado
const router = express.Router();
const multer = require('multer');
const sequelize = require('../config/database')
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

// Ruta para crear una nueva propiedad
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

// Ruta para obtener todas las propiedades con imágenes
router.get('/', async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [{ model: Image, as: 'images' }],
    });
    res.json(properties);
  } catch (error) {
    console.error("Error al obtener propiedades con imágenes:", error);
    res.status(500).json({ error: 'Error al obtener propiedades' });
  }
});

// Nueva ruta para obtener opciones de filtro
router.get('/filter-options', async (req, res) => {
  try {
    // Obtener todas las ubicaciones
    const locations = await Property.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('location')), 'location']],
      raw: true,
    });

    // Obtener todos los tipos de propiedad
    const types = await Property.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('type')), 'type']],
      raw: true,
    });

    // Obtener todas las comodidades (amenities) usando JSON
    const amenities = await sequelize.query(
      'SELECT DISTINCT jsonb_array_elements_text(amenities::jsonb) AS amenity FROM properties',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Retornar las opciones de filtros
    res.json({
      locations: locations.map(item => item.location),
      types: types.map(item => item.type),
      amenities: amenities.map(item => item.amenity),
    });
  } catch (error) {
    console.error("Error al obtener opciones de filtro:", error);
    res.status(500).json({ error: 'Error al obtener opciones de filtro' });
  }
});

// Ruta para filtrar propiedades
router.get('/filter', async (req, res) => {
  const { location, type, maxPrice, minRooms, minBathrooms, amenities } = req.query;

  try {
    const whereClause = {};
    if (location) whereClause.location = location;
    if (type) whereClause.type = type;
    if (maxPrice) whereClause.price = { [Sequelize.Op.lte]: maxPrice };
    if (minRooms) whereClause.rooms = { [Sequelize.Op.gte]: minRooms };
    if (minBathrooms) whereClause.bathrooms = { [Sequelize.Op.gte]: minBathrooms };
    if (amenities && amenities.length > 0) {
      whereClause.amenities = { [Sequelize.Op.contains]: amenities }; // Filter amenities
    }

    const properties = await Property.findAll({
      where: whereClause,
      include: [{ model: Image, as: 'images' }],
    });

    res.json(properties);
  } catch (error) {
    console.error("Error al filtrar propiedades:", error);
    res.status(500).json({ error: 'Error al filtrar propiedades' });
  }
});

// Ruta para eliminar una propiedad
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

// Ruta para actualizar una propiedad
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, price, location, rooms, bathrooms, amenities, services, description } = req.body;

    const updatedProperty = await Property.update(
      { title, type, price, location, rooms, bathrooms, amenities, services, description },
      { where: { id } }
    );

    res.status(200).json({ message: 'Propiedad actualizada correctamente' });
  } catch (error) {
    console.error("Error al actualizar propiedad:", error);
    res.status(500).json({ error: 'Error al actualizar la propiedad' });
  }
});

module.exports = router;













