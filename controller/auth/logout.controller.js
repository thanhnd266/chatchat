
const logoutController = (ctx) => {
    const { token } = ctx.request.auth;

    console.log(token);
}

module.exports = { logoutController };