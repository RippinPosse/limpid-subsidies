const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendUpdateNotification = async (user) => {
  try {
    await transporter.sendMail({
      from: '"Прозрачные субсидии" <noreply@vote.com>',
      to: user,
      subject: "Обновление по заявке!",
      text: "Заявка №... обнолена",
    });
  } catch (error) {
    throw new Error("send mail: " + error);
  }
};

module.exports = sendVoteNotification;
