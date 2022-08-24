const User = require('../models/User');
const mongoose = require('mongoose');
const { hashPassword } = require('../helpers/hashPassword');

// Get all users
const getListUser = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch(err) {
        res.status(400).send(err)
    }
};

// Get a user
const getOneUser = async (req, res) => {
    const userId = req.params.id;
    const username = req.query.username;

    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username });

        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch(err) {
        res.status(500).json(err);
    }
};

//Create a new user
const createUser = async(req, res, next) => {
    const { username, email, password } = req.body;

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

            res.status(200).json(user);
        } else if ((isExistUser && !isExistEmail) || (isExistUser && isExistEmail)) {
            res.status(404).json({
                status_code: 404,
                message: 'User already exists',
            })
        } else {
            res.status(404).json({
                status_code: 404,
                message: 'Email already exists',
            })
        }
        
    } catch(err) {
        res.status(400).json({ err: err.message });
    }
}

//Update user
const updateUser = async (req, res) => {

    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ err: 'No suck user' });
        };
    
        const user = await User.findOneAndUpdate(
            { _id: id },
            {
                ...req.body
            }
        );
    
        if(!user) {
            return res.status(400).json({ error: 'No suck user' });
        }

        res.status(200).json(user);
        
    } catch(err) {
        res.status(400).json({ err: err.message });
    }
}

module.exports = {
    getListUser,
    getOneUser,
    createUser,
    updateUser
}

