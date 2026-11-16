export default {
  routes: [
    {
      method: "POST",
      path: "/email/pre-registro",
      handler: "email.preRegistro",
    },
    {
      method: "POST",
      path: "/email/comprobante",
      handler: "email.comprobante",
    },
  ],
};
