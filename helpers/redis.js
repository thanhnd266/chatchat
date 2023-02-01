const redisClient = require('../config/redis');
const { accessTokenRedisLife, refreshTokenRedisLife, forgotTokenRedisLife } = require('../constants/redis');

const generateRedis = async (data) => {
    await Promise.all([
        redisClient.SET(data.access_token, data.refresh_token.toString()),
        redisClient.EXPIRE(data.access_token, accessTokenRedisLife),
        redisClient.SET(data.refresh_token, data.access_token.toString()),
        redisClient.EXPIRE(data.refresh_token, refreshTokenRedisLife),
    ])
};

const setSingleRedis = async (key, value, time) => {
    await Promise.all([
        redisClient.SET(key, value),
        redisClient.EXPIRE(key, time),
    ])
};

const getSingleRedis = async (key) => {
    return redisClient.GET(key);
};

const verifyRedis = (key) => {
    return redisClient.EXISTS(key);
};

const removeSingleRedis = (key) => {
    return redisClient.DEL(key);
};

module.exports = {
    generateRedis,
    setSingleRedis,
    getSingleRedis,
    verifyRedis,
    removeSingleRedis,
}

