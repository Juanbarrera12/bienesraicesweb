const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactControllers');
const { emailLimiter, validateContact } = require('../middleware/contactValidation');

router.post('/', emailLimiter, validateContact, contactController.sendEmail);

module.exports = router;
