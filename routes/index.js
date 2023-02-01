const KoaRouter = require('koa-router');

const router = new KoaRouter();
const routerAuth = require('./auth');
const routerConversation = require('./conversation');
const routerMessage = require('./message');
const routerUser = require('./user');

router.use("/auth", routerAuth);
router.use("/conversation", routerConversation);
router.use("/message", routerMessage);
router.use("/user", routerUser);

module.exports = router.routes();
