const { generateDataToken } = require('../../helpers/token');
const { comparePassword } = require('../../helpers/hashPassword');
const userSchema = require('../../models/User');
const { isValidEmail } = require('../../helpers/data_type');
const redisHelper = require('../../helpers/redis');

const loginController = async (ctx) => {
    try {
        let { userName, password } = ctx.request.body;

        console.log("vao day roi nhe");

        if(!password) {
            ctx.response.status = 400;
            ctx.response.body = {
                status_code: 400,
                message: 'Password is incorrect!'
            }
            return;
        }

        userName = userName.trim();
        password = password.trim();

        const userLogin = await userSchema.findOne({ email: userName });

        if(userLogin) {
            if(comparePassword(password, userLogin.password)) {
                //create jwt
                let token = await generateDataToken(userLogin._id.toString());

                //Create Redis
                redisHelper.generateRedis(token);

                ctx.response.status = 200;
                return ctx.response.body = {
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
                return;
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
            status_code: 500,
        }
    }
}

module.exports = {
    loginController
}