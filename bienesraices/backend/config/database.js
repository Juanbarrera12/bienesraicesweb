// backend/database.js
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
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado a la base de datos PostgreSQL');
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });

module.exports = sequelize;
