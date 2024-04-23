const nodemailer = require('nodemailer')
require('dotenv').config()

const MailService = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        text 
    }) 
  } catch (e) {
    throw e
  }
    
}

module.exports = MailService