const { verifyToken } = require('../../helpers/token');
const { verifyRedis } = require('../../helpers/redis');

const requireLogin = async (ctx, next) => {
    
    const { authorization } = ctx.request.headers;

    if(!authorization || !authorization.startsWith("Bearer")) {
        ctx.response.status = 401;
        ctx.response.body = {
            status_code: 401,
            message: 'Access Token expired',
        }
    };

    const access_token = authorization.split(' ')[1];

    try {
        //check exist in redis
        const is_verified = await verifyRedis(access_token);

        if(!is_verified) {
            ctx.response.status = 401;
            ctx.response.body = {
                status_code: 401,
                message: 'Access Token expired',
            }
        };

        //Check verify with JWT
        const payload = await verifyToken(access_token, 'access_token');

        ctx.state.user = {
            ...payload,
            access_token,
        }

        console.log(ctx.state)

        return next();
    } catch(err) {
        console.log('lot vo catch')

        ctx.response.status = 401;
        ctx.response.body = {
            status_code: 401,
            message: 'Access Token expired',
        }
    }
};

const verifyRefreshToken = async (ctx, next) => {
    const { refresh_token } = ctx.request.body;

    if(!refresh_token) {
        ctx.response.status = 403;
        ctx.response.body = {
            status_code: 403,
            message: 'Invalid Param',
        }
    }

    try {
        const is_verified = await verifyRedis(refresh_token);

        if(!is_verified) {
            ctx.response.status = 401;
            ctx.response.body = {
                status_code: 401,
                message: 'Refresh Token Expired',
            }
        }

        //check with JWT
        const payload = await verifyToken(refresh_token);

        ctx.state.auth = {
            payload,
            current_refresh_token: refresh_token,
        }

        return next();

    } catch(err) {
        ctx.response.status = 401;
        ctx.response.body = {
            status_code: 401,
            message: 'Refresh Token Expired',
        }
    }
}

module.exports = {
    requireLogin,
    verifyRefreshToken,
}