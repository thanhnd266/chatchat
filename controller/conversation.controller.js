const Conversation = require('../models/Conversation');
const mongoose = require('mongoose');

//Get conversations of a user
const getListConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch(err) {
        res.status(500).json(err);
    }
};

//Get one conversation of user
const getOneConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.userId, req.params.receiverId] },
        })

        res.status(200).json(conversation);

    } catch(err) {
        res.status(500).json(err);
    }
};

//Create new conversation
const createConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    })

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch(err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getListConversation,
    getOneConversation,
    createConversation,
}