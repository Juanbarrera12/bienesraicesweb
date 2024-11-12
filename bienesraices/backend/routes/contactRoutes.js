const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Ruta para crear un nuevo mensaje
router.post('/', contactController.createContact);

// Rutas para administración
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);
router.delete('/:id', contactController.deleteContact);

module.exports = router;