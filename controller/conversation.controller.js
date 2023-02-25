const Conversation = require("../models/Conversation");

//Get conversations of a user
const getListConversation = async (ctx) => {
  try {
    const _id = ctx.request.params.userId;

    const conversations = await Conversation.find({
        members: { $in: [_id] },
    }).populate({
      path: "members",
    });

    ctx.response.status = 200;
    ctx.response.body = {
      status_code: 200,
      data: conversations,
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = err;
  }
};

//Get one conversation of user
const getOneConversation = async (ctx) => {
  try {
    const conversation = await Conversation.findOne({
      members: {
        $all: [ctx.request.params.userId, ctx.request.params.receiverId],
      },
    }).populate({
      path: "members",
    });

    ctx.response.status = 200;
    ctx.response.body = {
      status_code: 200,
      data: conversation,
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = err;
  }
};

//Create new conversation
const createConversation = async (ctx) => {
  try {
    const receiverId = ctx.request.body.receiverId;
    const senderId = ctx.request.body.senderId;
    const newConversation = await new Conversation({
      members: [senderId, receiverId],
    }).populate({
      path: "members",
    });

    await newConversation.save();
    ctx.response.status = 200;
    ctx.response.body = {
      status_code: 200,
      data: newConversation,
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = err;
  }
};

module.exports = {
  getListConversation,
  getOneConversation,
  createConversation,
};
