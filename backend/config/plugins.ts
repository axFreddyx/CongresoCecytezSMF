// config/plugins.ts

module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: '482200074@alumnos.utzac.edu.mx',
          pass: 'ugcz akxy xtol jprh',
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      settings: {
        defaultFrom: '482200074@alumnos.utzac.edu.mx',
        defaultReplyTo: '482200074@alumnos.utzac.edu.mx',
        templates: {
          
        },
      },
    },
  },
});


