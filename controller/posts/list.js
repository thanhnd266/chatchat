const PostSchema = require("../../models/Posts");

const getPosts = async (ctx) => {
  try {
    const userId = ctx.request.body;
    console.log(userId);

    if (!userId) {
      ctx.response.status = 403;
      ctx.response.body = {
        status_code: 403,
        message: "Invalid parameters",
      };

      return;
    }

    const posts = await PostSchema.find({ userId });
    console.log(posts);

    ctx.response.status = 200;
    ctx.response.body = {
      status_code: 200,
      message: "Get list posts successfully",
    };
    return;
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.body = {
      status_code: 400,
      err,
    };
  }
};

module.exports = getPosts;
