const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactControllers');

// Ruta para enviar email
router.post('/', contactController.sendEmail);

module.exports = router;
