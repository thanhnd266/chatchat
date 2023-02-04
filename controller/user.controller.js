const User = require('../models/User');
const mongoose = require('mongoose');
const { hashPassword } = require('../helpers/hashPassword');

// Get all users
const getListUser = async (ctx) => {
    try {

        const userId = ctx.state.user.data;
        
        if(!userId) {
            ctx.response.status = 403;
            ctx.response.body = {
                status_code: 403,
                message: 'You need to login',
            }
        }

        const users = await User.find({}).sort({ createdAt: -1 });

        ctx.response.status = 200;
        ctx.response.body = {
            status_code: 200,
            message: 'Get list users successfully',
            data: users,
        };
    } catch(err) {
        ctx.response.status = 400;
        ctx.response.body = {
            status_code: 400,
            err
        };
    }
};

// Get a user
const getOneUser = async (ctx) => {
    const userId = ctx.request.params.id;
    const username = ctx.request.query.username;

    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username });

        const { password, updatedAt, ...other } = user._doc;
        ctx.response.status = 200;
        ctx.response.body = other;
    } catch(err) {
        ctx.response.status = 500;
        ctx.response.body = err;
    }
};

//Create a new user
const createUser = async(ctx, next) => {
    const { username, email, password } = ctx.request.body;

    //Add to the db
    try {
        const isExistUser = await User.findOne({ username });
        const isExistEmail = await User.findOne({ email });

        if(!isExistUser && !isExistEmail) {
            const user = await User.create({
                username,
                email,
                password: hashPassword(password),
            });
            ctx.response.status = 200;
            ctx.response.body = user;
        } else if ((isExistUser && !isExistEmail) || (isExistUser && isExistEmail)) {
            ctx.response.status = 404;
            ctx.response.body = {
                status_code: 404,
                message: 'User already exists',
            }
        } else {
            ctx.response.status = 404;
            ctx.response.body = {
                status_code: 404,
                message: 'Email already exists',
            }
        }
        
    } catch(err) {
        ctx.response.status = 400;
        ctx.response.body = { err: err.message };
    }
}

//Update user
const updateUser = async (ctx) => {

    const { id } = ctx.request.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            ctx.response.status = 404;
            ctx.response.body = { err: 'No suck user' }
            return;
        };
    
        const user = await User.findOneAndUpdate(
            { _id: id },
            {
                ...ctx.request.body
            }
        );
    
        if(!user) {
            ctx.response.status = 400;
            ctx.response.body = { error: 'No suck user' };
            return
        }
        ctx.response.status = 200;
        ctx.response.body = user;
    } catch(err) {
        ctx.response.status = 400;
        ctx.response.body = { err: err.message };
    }
}

module.exports = {
    getListUser,
    getOneUser,
    createUser,
    updateUser
}

