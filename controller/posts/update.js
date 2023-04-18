const PostSchema = require("../../models/Posts");
const User = require("../../models/User");

const updatePost = async (ctx) => {
  const { id } = ctx.request.params;
  const payload = ctx.request.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      ctx.response.status = 404;
      ctx.response.body = {
        status_code: 404,
        message: "No Post Matching!",
      };
    }

    const postUpdate = await PostSchema.findOneAndUpdate(
      { _id: id },
      {
        ...payload,
      }
    );

    if (!postUpdate) {
      ctx.response.status = 400;
      ctx.response.body = {
        status_code: 400,
        error: "No Post Matching!",
      };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = {
      status_code: 200,
      message: "Update post successfully!",
      data: postUpdate,
    };
    return;
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.body = { err: err.message };
  }
};

module.exports = updatePost;
