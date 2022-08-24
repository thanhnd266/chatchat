const Message = require('../models/Message');
const mongoose = require('mongoose');

//Get message from conversation
const getMessage = async (req, res) => {

    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });

        res.status(200).json(messages);

    } catch(err) {
        res.status(500).json(err);
    }
}

// Add message
const addMessage = async (req, res) => {
    const newMessage = new Message(req.body);
    
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);

    } catch(err) {
        res.status(500).json(err);
    }
};

module.exports = { getMessage, addMessage }