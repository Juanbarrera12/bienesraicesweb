// backend/models/Property.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Property = sequelize.define('Property', {
  title: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  imageUrl: { type: DataTypes.STRING }, // Campo para la URL de la imagen
}, {
  timestamps: true,
});

module.exports = Property;

