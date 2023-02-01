const jwt = require('jsonwebtoken');

const accessTokenLife = parseInt(process.env.ACCESS_TOKEN_LIFE);
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenLife = parseInt(process.env.REFRESH_TOKEN_LIFE);
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const createToken = (payload, secretKey, tokenLife) => {
    return jwt.sign({ data: payload }, secretKey, {
        algorithm: 'HS256',
        expiresIn: tokenLife,
    });
};

const verifyToken = (token, type) => {
    let secretKey = (type === 'access_token') ? accessTokenSecret : refreshTokenSecret;
    return jwt.verify(token, secretKey);
};

const generateDataToken = async (payload) => {
    const generate = await Promise.all([
        createToken(payload, accessTokenSecret, accessTokenLife),
        createToken(payload, refreshTokenSecret, refreshTokenLife),
    ]);

    return {
        access_token: generate[0],
        refresh_token: generate[1],
        expired_time: (Date.now() + (accessTokenLife*1000))
    }
};

module.exports = {
    createToken,
    verifyToken,
    generateDataToken,
}