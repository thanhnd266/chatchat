const KoaRouter = require('koa-router');
const { getMessage, addMessage } = require('../controller/message.controller');

const router = new KoaRouter();

//Get message
router.get('/get/:conversationId', getMessage);

//Add message
router.post('/add', addMessage);

module.exports = router.routes();