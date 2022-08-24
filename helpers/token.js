const jwt = require('jsonwebtoken');

const jwtSecret = 'cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_eqJqieds';

const createToken = payload => {
    return jwt.sign(payload, jwtSecret, {
        algorithm: 'HS256',
        expiresIn: '30s',
    })
};

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecret);
};

module.exports = {
    createToken,
    verifyToken
}