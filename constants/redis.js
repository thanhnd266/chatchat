module.exports = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    accessTokenRedisLife: parseInt(process.env.REDIS_ACCESS_TOKEN_LIFE),
    refreshTokenRedisLife: parseInt(process.env.REDIS_REFRESH_TOKEN_LIFE),
    forgotTokenRedisLife: parseInt(process.env.REDIS_FORGOT_TOKEN_LIFE),
}