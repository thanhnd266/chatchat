const PostSchema = require("../../models/Posts");

const getPosts = async (ctx) => {
  try {
    const { limit, page, order, filter } = ctx.request.body;

    const posts = await PostSchema.getPostByLimit(limit, page, order, filter);

    ctx.response.status = 200;
    ctx.response.body = {
      status_code: 200,
      message: "Get list posts successfully",
      data: posts,
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
