const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false, // Desactiva los logs SQL en consola
    pool: {
      max: 5, // Máximo número de conexiones en el pool
      min: 0, // Mínimo número de conexiones en el pool
      acquire: 30000, // Tiempo máximo en ms que el pool tratará de obtener una conexión antes de lanzar error
      idle: 10000 // Tiempo máximo en ms que una conexión puede estar inactiva antes de ser liberada
    },
    define: {
      timestamps: true, // Agrega createdAt y updatedAt automáticamente
      underscored: true, // Usa snake_case en lugar de camelCase para los nombres de las columnas
    }
  }
);

// Función para inicializar la base de datos
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos PostgreSQL');
    
    // Sincronizar todos los modelos
    // force: false significa que no eliminará las tablas existentes
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados con la base de datos');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1); // Termina el proceso si no se puede conectar a la base de datos
  }
};

module.exports = { sequelize, initializeDatabase };