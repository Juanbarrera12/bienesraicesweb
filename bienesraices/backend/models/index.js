const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Property = require('./Property');
const Image = require('./Image');

// Definir asociaciones
Property.hasMany(Image, { as: 'images', foreignKey: 'propertyId' });
Image.belongsTo(Property, { foreignKey: 'propertyId' });

// Exportar modelos y sequelize
module.exports = {
  sequelize,
  Property,
  Image,
};
