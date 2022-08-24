const express = require('express');
const { getMessage, addMessage } = require('../controller/message.controller');
const router = express.Router();

//Get message
router.get('/get/:conversationId', getMessage);

//Add message
router.post('/add', addMessage);

module.exports = router;