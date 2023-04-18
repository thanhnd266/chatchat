const KoaRouter = require("koa-router");
const router = new KoaRouter();
const { sendingEmail } = require("../controller/email.controller");
const { authenticate } = require("../middleware/auth/authenticate");

router.post("/register", authenticate, sendingEmail);

module.exports = router.routes();
