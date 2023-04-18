const { transportEmail } = require("../helpers/email");

const sendingEmail = async (ctx) => {
  const { email } = ctx.request.body;

  try {
    const info = await transportEmail(email);

    ctx.response.body = {
      ...info,
    };
  } catch (err) {
    ctx.response.body = {
      status: 500,
      message: err,
    };
  }
};

module.exports = {
  sendingEmail,
};
