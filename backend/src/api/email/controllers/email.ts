import fs from 'fs';
import path from 'path';

export default {
  async preRegistro(ctx) {
    const { email, nombre, folio, urlAcceso } = ctx.request.body;

    try {
      // Cargar template
      const templatePath = path.join(process.cwd(), 'templates', 'preRegistro.html');
      let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

      // Reemplazar variables
      htmlTemplate = htmlTemplate
        .replace('{{nombre}}', nombre)
        .replace('{{folio}}', folio)
        .replace('{{urlAcceso}}', urlAcceso);

      // Enviar correo
      await strapi.plugin('email').service('email').send({
        to: email,
        from: 'no-reply@tudominio.com',
        subject: 'Registro exitoso',
        html: htmlTemplate,
      });

      ctx.send({ ok: true, message: 'Correo enviado correctamente' });
    } catch (error) {
      console.error("Error al enviar el email:", error.message);
      ctx.response.status = 400;
      ctx.body = { message: "Error al enviar el email. Revisa logs del servidor." };
    }
  },
  async comprobante(ctx) {
    const { email, nombre, urlAcceso, estado } = ctx.request.body;

    try {
      // Cargar template
      const templatePath = path.join(process.cwd(), 'templates', 'comprobante.html');
      let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

      // Texto según estado
      const mensajeEstado =
        estado === 'aceptado'
          ? 'Tu comprobante ha sido <strong>aceptado.</strong> Ya puedes descargar tu gafete.'
          : estado === 'rechazado'
            ? 'Tu comprobante ha sido <strong>rechazado.</strong> Por favor, vuelve a subir tu comprobante de pago.'
            : estado === 'cancelado'
              ? 'Tu comprobante ha sido <strong>cancelado.</strong> Si necesitas subir uno nuevo, puedes hacerlo desde tu perfil.'
              : 'Estado desconocido.';  // opcional


      // Reemplazar variables
      htmlTemplate = htmlTemplate
        .replace('{{nombre}}', nombre)
        .replace('{{urlAcceso}}', urlAcceso)
        .replace('{{estadoComprobante}}', mensajeEstado);

      // Enviar correo
      await strapi.plugin('email').service('email').send({
        to: email,
        from: 'no-reply@tudominio.com',
        subject: `Comprobante ${estado === 'aceptado'
            ? 'Aceptado'
            : estado === 'rechazado'
              ? 'Rechazado'
              : estado === 'cancelado'
                ? 'Cancelado'
                : 'Actualizado'
          }`,

        html: htmlTemplate,
      });

      ctx.send({ ok: true, message: 'Correo enviado correctamente' });
    } catch (error) {
      console.error("Error al enviar el email:", error.message);
      ctx.response.status = 400;
      ctx.body = { message: "Error al enviar el email. Revisa logs del servidor." };
    }
  }

};
