const KoaRouter = require('koa-router');

const router = new KoaRouter();

const { 
    getListConversation,
    getOneConversation,
    createConversation,
} = require('../controller/conversation.controller');

//Get conversation of user
router.get('/get-list/:userId', getListConversation);
router.get('/get-one/:userId/:receiverId', getOneConversation);
router.post('/create', createConversation);

module.exports = router.routes();