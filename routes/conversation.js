const KoaRouter = require('koa-router');

const router = new KoaRouter();

const { 
    getListConversation,
    getOneConversation,
    createConversation,
} = require('../controller/conversation.controller');
const { createCommunity, createBotChat, createMessage } = require('../controller/chats/community');

//Get conversation of user
router.get('/get-list/:userId', getListConversation);
router.get('/get-one/:userId/:receiverId', getOneConversation);
router.post('/create', createConversation);
router.post('/create-community', createCommunity);
router.post('/create-botchat', createBotChat);
router.post('/create-message', createMessage);

module.exports = router.routes();