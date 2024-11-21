const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Property = require('./Property'); // Importa el modelo Property

const Image = sequelize.define('Image', {
  url: DataTypes.STRING,
  propertyId: DataTypes.INTEGER,
});

module.exports = Image;






