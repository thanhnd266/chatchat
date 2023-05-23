const KoaRouter = require("koa-router");
const getPosts = require("../controller/posts/list");
const createPost = require("../controller/posts/create");
const updatePost = require("../controller/posts/update");
const removePost = require("../controller/posts/remove");
const likePost = require("../controller/posts/like");

const router = new KoaRouter();

const upload = require("../helpers/images");

//Get posts
router.post("/getList", getPosts);

//Create post
router.post("/create", upload.any(), createPost);

//Update post
router.post("/update/:id", upload.any(), updatePost);

//Delete post
router.post("/delete/:id", removePost);

//Like post
router.post("/like/:id", likePost);

module.exports = router.routes();
