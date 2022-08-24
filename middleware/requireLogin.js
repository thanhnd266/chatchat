const { verifyToken } = require('../helpers/token');
const userSchema = require('../models/User');

const requireLogin = async (req, res, next) => {
    try {
        let decoded, token;

        if(req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
            if(token) {
                decoded = verifyToken(token);
                if(decoded) {
                    const user = await userSchema.findById(decoded._id);
                    if(user) {
                        return next();
                    }

                    return res.status(400).json({
                        status_code: 400,
                        message: 'User not found',
                    });
                }
            } else {
                return res.status(400).json({
                    status_code: 400,
                    message: 'Token is not valid',
                });
            }
        } else {
            return res.status(401).json({
                status_code: 401,
                message: 'Not Authorized',
            })
        }
    } catch(err) {
        return res.status(500).json({
            error: err.message,
            error_code: 500,
        });
    }
}

module.exports = { requireLogin };