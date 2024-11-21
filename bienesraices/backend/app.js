const express = require('express');
const { sequelize } = require('./models'); // Importa sequelize y los modelos desde index.js
const cors = require('cors'); 
const bodyParser = require('body-parser');
const propertyRoutes = require('./routes/propertyRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require("./routes/authRoutes");
require('dotenv').config();

const app = express();

app.use(cors()); // Activa CORS para todas las rutas
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/properties', propertyRoutes);
app.use('/api/contact', contactRoutes);
app.use('/uploads', express.static('uploads'));
app.use("/api/auth", authRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos PostgreSQL");

    await sequelize.sync({ alter: true });
    console.log("Base de datos sincronizada correctamente");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

startServer();



