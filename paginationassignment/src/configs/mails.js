const nodemailer=require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
      user: "d680d3b25effb0", 
      pass: "05118830b243e6",
    },
  });
  

  module.exports = transporter 