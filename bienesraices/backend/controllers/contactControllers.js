const Contact = require('../models/Contact');

const contactController = {
  // Crear nuevo mensaje de contacto
  createContact: async (req, res) => {
    try {
      const { name, email, message, rating } = req.body;

      const newContact = await Contact.create({
        name,
        email,
        message,
        rating
      });

      res.status(201).json({
        success: true,
        message: 'Mensaje enviado exitosamente',
        data: newContact
      });
    } catch (error) {
      console.error('Error al crear mensaje de contacto:', error);
      res.status(500).json({
        success: false,
        message: 'Error al enviar el mensaje',
        error: error.message
      });
    }
  },

  // Obtener todos los mensajes (para administración)
  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.findAll({
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json({
        success: true,
        data: contacts
      });
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener los mensajes',
        error: error.message
      });
    }
  },

  // Obtener un mensaje específico
  getContactById: async (req, res) => {
    try {
      const contact = await Contact.findByPk(req.params.id);
      
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Mensaje no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        data: contact
      });
    } catch (error) {
      console.error('Error al obtener mensaje:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el mensaje',
        error: error.message
      });
    }
  },

  // Eliminar un mensaje
  deleteContact: async (req, res) => {
    try {
      const contact = await Contact.findByPk(req.params.id);
      
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Mensaje no encontrado'
        });
      }

      await contact.destroy();

      res.status(200).json({
        success: true,
        message: 'Mensaje eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error al eliminar mensaje:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el mensaje',
        error: error.message
      });
    }
  }
};

module.exports = contactController;