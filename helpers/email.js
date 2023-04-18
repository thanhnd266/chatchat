const nodemailer = require("nodemailer");

const transportEmail = async (email) => {
  const result = await new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_HOST,
      to: email,
      subject: "Sending Email with React And Node Application",
      html: `<h1>Ban gui duoc email roi huhuhu</h1>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject({
          status: 500,
          message: err,
        });
      } else {
        resolve({
          status: 200,
          message: "Send email successfully",
          data: info,
        });
      }
    });
  });

  return result;
};

module.exports = {
  transportEmail,
};
