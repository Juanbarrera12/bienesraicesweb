const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize, initializeDatabase } = require('./config/database');
const propertyRoutes = require('./routes/propertyRoutes');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/properties', propertyRoutes);
app.use('/api/contact', contactRoutes);

// Inicializar base de datos y servidor
const startServer = async () => {
  try {
    // Inicializar la base de datos
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
