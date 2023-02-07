const Message = require('../models/Message');

//Get message from conversation
const getMessage = async (ctx) => {

    try {
        const messages = await Message.find({
            conversationId: ctx.request.params.conversationId,
        });
        ctx.response.status = 200;
        ctx.response.body = {
            status_code: 200,
            data: messages,
        };
    } catch(err) {
        ctx.response.status = 500;
        ctx.response.body = err;
    }
}

// Add message
const addMessage = async (ctx) => {
    const newMessage = ctx.request.body;
    
    if(!newMessage || !newMessage.text) {
        ctx.response.status = 400;
        return ctx.response.body = {
            status_code: 400,
            message: 'Invalid Parameters',
            error_message: 'invalid_params',
        }
    }

    try {
        const savedMessage = await Message.create(newMessage);
        const conversationMessage = await Message.find({ 
            conversationId: newMessage.conversationId,
        });

        ctx.response.status = 200;
        return ctx.response.body = {
            status_code: 200,
            message: 'Added message successfully',
            data: conversationMessage,
        };
    } catch(err) {
        ctx.response.status = 500;
        ctx.response.body = err;
    }
};

module.exports = { getMessage, addMessage }