const KoaRouter = require("koa-router");
const getPosts = require("../controller/posts/list");
const createPost = require("../controller/posts/create");
const updatePost = require("../controller/posts/update");
const removePost = require("../controller/posts/remove");

const router = new KoaRouter();

const upload = require("../helpers/images");

//Get posts
router.get("/:userId", getPosts);

//Create post
router.post("/create", upload.any(), createPost);

//Update post
router.post("/update/:id", updatePost);

//Delete post
router.post("/delete/:id", removePost);

module.exports = router.routes();
