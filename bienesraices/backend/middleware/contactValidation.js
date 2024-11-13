const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Limitar intentos de envío
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 mensajes por IP
  message: {
    error: 'Demasiados intentos de contacto. Por favor, intente más tarde.'
  }
});

// Validación de campos
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email no válido'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('El mensaje debe tener entre 10 y 1000 caracteres'),
  
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('La calificación debe ser entre 1 y 5'),

  // Middleware para verificar errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array() // Muestra los errores de validación
      });
    }
    next();
  }
];

module.exports = {
  emailLimiter,
  validateContact
};
