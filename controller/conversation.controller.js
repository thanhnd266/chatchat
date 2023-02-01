const Conversation = require('../models/Conversation');
const mongoose = require('mongoose');

//Get conversations of a user
const getListConversation = async (ctx) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [ctx.request.params.userId] },
        });
        ctx.response.status = 200;
        ctx.response.body = conversation;
    } catch(err) {
        ctx.response.status = 500;
        ctx.response.body = err;
    }
};

//Get one conversation of user
const getOneConversation = async (ctx) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [ctx.request.params.userId, ctx.request.params.receiverId] },
        })
        ctx.response.status = 200;
        ctx.response.body = conversation;

    } catch(err) {
        ctx.response.status = 500;
        ctx.response.body = err;
    }
};

//Create new conversation
const createConversation = async (ctx) => {
    const newConversation = new Conversation({
        members: [ctx.request.body.senderId, ctx.request.body.receiverId],
    })

    try {
        const savedConversation = await newConversation.save();
        ctx.response.status = 200;
        ctx.response.body = savedConversation;
    } catch(err) {
        ctx.response.status = 500;
        ctx.response.body = err;
    }
}

module.exports = {
    getListConversation,
    getOneConversation,
    createConversation,
}