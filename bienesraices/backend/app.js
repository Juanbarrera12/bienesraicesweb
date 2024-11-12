// backend/app.js
const express = require('express');
const sequelize = require('./config/database');
const propertyRoutes = require('./routes/propertyRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// Servir archivos estáticos de la carpeta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usar las rutas de propiedades
app.use('/api/properties', propertyRoutes);

// Sincronizar la base de datos y luego iniciar el servidor
sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Servidor escuchando en el puerto 5000');
  });
}).catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});
