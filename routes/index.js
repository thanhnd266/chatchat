const KoaRouter = require("koa-router");

const router = new KoaRouter();
const routerAuth = require("./auth");
const routerConversation = require("./conversation");
const routerMessage = require("./message");
const routerUser = require("./user");
const routerImage = require("./images");
const routerEmail = require("./email");
const routerPost = require("./post");

router.use("/auth", routerAuth);
router.use("/conversation", routerConversation);
router.use("/message", routerMessage);
router.use("/user", routerUser);
router.use("/image", routerImage);
router.use("/email", routerEmail);
router.use("/posts", routerPost);

module.exports = router.routes();
