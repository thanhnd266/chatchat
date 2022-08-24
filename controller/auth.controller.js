const { createToken } = require('../helpers/token');
const { comparePassword } = require('../helpers/hashPassword');
const userSchema = require('../models/User');

const authLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userSchema.findOne({ username });

        if(user) {
            if(comparePassword(password, user.password)) {
                let access_token = createToken(user.toJSON());
                res.status(200).json({
                    status_code: 200,
                    data: {
                        ...user._doc,
                        access_token,
                    },
                });
            } else {
                res.status(404).json({
                    status_code: 404,
                    message: 'Password is not correct',
                });
            }
        } else {
            res.status(404).json({
                status_code: 404,
                message: 'User not found',
            });
        }
    } catch(err) {
        res.status(500).json({
            message: err.message,
            error_code: 500,
        });
    }
}

module.exports = {
    authLogin
}