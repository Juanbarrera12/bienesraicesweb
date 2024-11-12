// backend/app.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const propertyRoutes = require('./routes/propertyRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// Rutas para propiedades
app.use('/api/properties', propertyRoutes); // Ruta general para propiedades
app.use('/admin/propiedades', propertyRoutes); // Ruta adicional para administración

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Servidor escuchando en el puerto 5000');
  });
}).catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});

