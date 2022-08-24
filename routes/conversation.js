const express = require('express');

const router = express.Router();

const { 
    getListConversation,
    getOneConversation,
    createConversation,
} = require('../controller/conversation.controller');

//Get conversation of user
router.get('/get-list/:userId', getListConversation);
router.get('/get-one/:userId/:receiverId', getOneConversation);
router.post('/create', createConversation);

module.exports = router;