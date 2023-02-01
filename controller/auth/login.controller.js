const { generateDataToken } = require('../../helpers/token');
const { comparePassword } = require('../../helpers/hashPassword');
const userSchema = require('../../models/User');
const { isValidEmail } = require('../../helpers/data_type');
const redisHelper = require('../../helpers/redis');

const loginController = async (ctx) => {
    try {
        let { email, password } = ctx.request.body;

        if(!email || !isValidEmail(email)) {
            ctx.response.status = 400;
            ctx.response.body = {
                status_code: 400,
                message: 'Email is incorrect!'
            }
        }

        if(!password) {
            ctx.response.status = 400;
            ctx.response.body = {
                status_code: 400,
                message: 'Password is incorrect!'
            }
        }

        email = email.trim();
        password = password.trim();

        const userLogin = await userSchema.findOne({ email });

        if(userLogin) {
            if(comparePassword(password, userLogin.password)) {
                //create jwt
                let token = await generateDataToken(userLogin._id.toString());

                //Create Redis
                redisHelper.generateRedis(token);

                ctx.response.status = 200;
                ctx.response.body = {
                    status_code: 200,
                    message: 'Login successfully',
                    data: {
                        data: userLogin,
                        ...token,
                    },
                }
            } else {
                ctx.response.status = 400;
                ctx.response.body = {
                    status_code: 400,
                    message: 'Password is not correct',
                }
            }
        } else {
            ctx.response.status = 400;
            ctx.response.body = {
                status_code: 400,
                message: 'User not found',
            }
        }
    } catch(err) {
        ctx.response.status = 500;
        ctx.response.body = {
            message: err.message,
            error_code: 500,
        }
    }
}

module.exports = {
    loginController
}