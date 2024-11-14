const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Image = require('./Image'); // Importa el modelo Image

const Property = sequelize.define('Property', {
  title: DataTypes.STRING,
  type: DataTypes.STRING,
  price: DataTypes.STRING,
  location: DataTypes.STRING,
  rooms: DataTypes.INTEGER,
  bathrooms: DataTypes.INTEGER,
  amenities: DataTypes.JSON,
  services: DataTypes.JSON,
  description: DataTypes.TEXT,
});

module.exports = Property;














