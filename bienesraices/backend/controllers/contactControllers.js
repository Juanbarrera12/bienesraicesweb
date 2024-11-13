const nodemailer = require('nodemailer');
require('dotenv').config();

// Configurar el transporter de nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true para puerto 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD // Contraseña de aplicación para Gmail
  }
});

const contactController = {
  sendEmail: async (req, res) => {
    try {
      const { name, email, message, rating } = req.body;

      // Configurar el email
      const mailOptions = {
        from: `"Formulario de Contacto" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECIPIENT, // Email donde recibirás los mensajes
        subject: `Nuevo mensaje de contacto de ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
              Nuevo Mensaje de Contacto
            </h2>
            <div style="margin: 20px 0; background: #f9f9f9; padding: 15px; border-radius: 5px;">
              <p style="margin: 10px 0;"><strong>Nombre:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0;">
                <strong>Calificación:</strong> 
                ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}
                (${rating} de 5)
              </p>
              <div style="margin: 20px 0;">
                <strong>Mensaje:</strong>
                <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
                  ${message}
                </p>
              </div>
            </div>
            <div style="color: #666; font-size: 12px; margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
              Este mensaje fue enviado desde el formulario de contacto de tu sitio web.
            </div>
          </div>
        `
      };

      // Enviar el email
      await transporter.sendMail(mailOptions);

      res.status(200).json({
        success: true,
        message: 'Mensaje enviado exitosamente'
      });
    } catch (error) {
      console.error('Error al enviar el email:', error);
      res.status(500).json({
        success: false,
        message: 'Error al enviar el mensaje',
        error: error.message,  // Muestra el mensaje de error
        stack: error.stack     // Muestra el stack trace (útil para debugging)
      });
    }
  }
};

module.exports = contactController;
