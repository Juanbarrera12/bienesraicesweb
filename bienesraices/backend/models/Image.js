// models/image.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Property = require('./property');

const Image = sequelize.define('Image', {
  url: { type: DataTypes.STRING, allowNull: false },
  propertyId: { type: DataTypes.INTEGER, allowNull: false },
});

Image.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });
Property.hasMany(Image, { foreignKey: 'propertyId', as: 'images' });

module.exports = Image;





