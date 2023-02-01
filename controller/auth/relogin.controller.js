const jwtHelper = require('../../helpers/token');
const redisHelper = require('../../helpers/redis');

const reloginController = async (ctx) => {
    const payload = ctx.state.auth.payload;
    const refresh_token = ctx.state.auth.current_refresh_token;

    if(!payload) {
        ctx.response.status = 401;
        ctx.response.body = {
            status_code: 401,
            message: 'Invalid Parameter',
        }
    };

    //Create new JWT Token
    let dataToken = await jwtHelper.generateDataToken(payload);
    dataToken.refresh_token = refresh_token;

    //Get old access token and remove it
    const oldAccessToken = await redisHelper.getSingleRedis(refresh_token);

    //Clear both access and refresh token
    await Promise.all([
        redisHelper.removeSingleRedis(oldAccessToken),
        redisHelper.removeSingleRedis(refresh_token),
    ])

    //Create new redis
    redisHelper.generateRedis(dataToken);

    ctx.response.status = 200;
    ctx.response.body = {
        status_code: 200,
        message: 'Relogin successfully',
        data: dataToken,
    }

}

module.exports = {
    reloginController
};