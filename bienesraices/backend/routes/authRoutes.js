const express = require("express");
const { login, verifyToken, verifyAdmin } = require("../controllers/authController");

const router = express.Router();

// Ruta para login
router.post("/login", login);

// Ruta protegida (solo para probar)
router.get("/admin", verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: "Bienvenido al panel de administración" });
});

// Verificar si el usuario tiene un token válido
router.get('/verify', verifyToken, verifyAdmin, (req, res) => {
    res.status(200).json({ message: 'Token válido, usuario autenticado.' });
  });

module.exports = router;
