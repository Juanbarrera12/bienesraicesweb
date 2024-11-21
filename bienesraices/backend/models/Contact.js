const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100]
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [10, 1000]
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
}, {
  tableName: 'contacts', // Nombre explícito de la tabla
  timestamps: true, // Habilita createdAt y updatedAt
  underscored: true, // Usa snake_case para los nombres de columnas
  indexes: [
    {
      fields: ['email'] // Índice para búsquedas por email
    },
    {
      fields: ['created_at'] // Índice para ordenar por fecha
    }
  ]
});

module.exports = Contact;