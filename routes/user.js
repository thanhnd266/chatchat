const express = require('express');

const { 
    getListUser, 
    getOneUser, 
    createUser, 
    updateUser 
} = require('../controller/user.controller');

const router = express.Router();

//Get all users
router.get('/get-list', getListUser);

//Create a new user
router.post('/create', createUser);

//Get on user
router.get('/:id', getOneUser);

//Update user
router.patch('/update/:id', updateUser);

module.exports = router;