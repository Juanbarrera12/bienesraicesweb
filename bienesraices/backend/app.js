const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize, initializeDatabase } = require('./config/database');
const propertyRoutes = require('./routes/propertyRoutes'); // Asegúrate de que este archivo exista
const contactRoutes = require('./routes/contactRoutes'); // Asegúrate de que este archivo exista
const { emailLimiter, validateContact } = require('../backend/middleware/contactValidation');
const router = express.Router();
const contactController = require('./controllers/contactControllers');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta de contacto
app.use('/api/contact', emailLimiter, validateContact, contactController.sendEmail);

// Rutas
app.use('/api/properties', propertyRoutes);
app.use('/api/contact', contactRoutes);

// Inicializar base de datos y servidor
const startServer = async () => {
  try {
    // Inicializar la base de datos (sincroniza los modelos)
    await initializeDatabase();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
