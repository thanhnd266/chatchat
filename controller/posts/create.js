const PostSchema = require("../../models/Posts");
const User = require("../../models/User");

const createPost = async (ctx) => {
  const payload = ctx.request.body;
  const file = ctx.request.files;

  console.log(file);
  console.log(JSON.parse(payload.payload));

  try {
    if (!payload.userId || !payload.public_status) {
      ctx.response.status = 403;
      ctx.response.body = {
        status_code: 403,
        message: "Invalid parameters",
      };

      return;
    }

    if (!payload.content && payload.image.length === 0) {
      ctx.response.status = 403;
      ctx.response.body = {
        status_code: 403,
        message: "Posts must have content",
      };
      return;
    }

    const isExistUser = await User.findOne({ _id: payload.userId });

    if (!isExistUser) {
      ctx.response.status = 403;
      ctx.response.body = {
        status_code: 403,
        message: "User not found",
      };
      return;
    }

    const newPost = await PostSchema.create({
      ...payload,
    });

    ctx.response.status = 200;
    ctx.response.body = {
      status_code: 200,
      message: "Create post successfully",
      data: newPost,
    };
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.body = { err: err.message };
  }
};

module.exports = createPost;
