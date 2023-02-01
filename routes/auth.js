const KoaRouter = require('koa-router');
const { loginController } = require('../controller/auth/login.controller');

const router = new KoaRouter();

router.post('/api/signin', loginController);

module.exports = router.routes();