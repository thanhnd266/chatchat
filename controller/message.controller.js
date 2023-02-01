const Message = require('../models/Message');
const mongoose = require('mongoose');

//Get message from conversation
const getMessage = async (ctx) => {

    try {
        const messages = await Message.find({
            conversationId: ctx.request.params.conversationId,
        });
        ctx.response.status = 200;
        ctx.response.body = messages;
    } catch(err) {
        ctx.response.status = 500;
        ctx.response.body = err;
    }
}

// Add message
const addMessage = async (ctx) => {
    const newMessage = new Message(ctx.request.body);
    
    try {
        const savedMessage = await newMessage.save();
        ctx.response.status = 200;
        ctx.response.body = savedMessage;
        // res.status(200).json(savedMessage);
    } catch(err) {
        ctx.response.status = 500;
        ctx.response.body = err;
    }
};

module.exports = { getMessage, addMessage }