const KoaRouter = require('koa-router');
const { loginController } = require('../controller/auth/login.controller');
const { logoutController } = require('../controller/auth/logout.controller');
const { reloginController } = require('../controller/auth/relogin.controller');
const { verifyRefreshToken, authenticate } = require('../middleware/auth/authenticate');

const router = new KoaRouter();

router.post('/api/signin', loginController);
router.post('/api/relogin', verifyRefreshToken, reloginController);
router.post('/api/logout', authenticate, logoutController);

module.exports = router.routes();