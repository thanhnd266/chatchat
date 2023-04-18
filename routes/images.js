const Router = require("koa-router");
const router = new Router();

const upload = require("../helpers/images");
const {
  handleChangeAvatar,
} = require("../controller/images/upload.controller");
const { authenticate } = require("../middleware/auth/authenticate");

router.post("/upload/avatar", upload.single("avatar"), handleChangeAvatar);

module.exports = router.routes();
