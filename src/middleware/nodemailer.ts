const nodemailer = require("nodemailer");

export const transport = nodemailer.createTransport({
  service: "gmail",
  host: "mail.joaovictor.com.br",
  auth: {
    user: "joaovictorfelix2001@gmail.com",
    pass: "joaovictor16",
  },
});
