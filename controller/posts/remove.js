const { default: mongoose } = require("mongoose");
const PostSchema = require("../../models/Posts");

const removePost = async (ctx) => {
  const { id } = ctx.request.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      ctx.response.status = 404;
      ctx.response.body = {
        status_code: 404,
        message: "No Post Matching!",
      };
      return;
    }

    const postDelete = await PostSchema.findOne({ _id: id }).lean();
    if (!postDelete) {
      ctx.response.status = 404;
      ctx.response.body = {
        status_code: 404,
        message: "No Post Matching!",
      };
      return;
    }

    await PostSchema.findOneAndRemove({ _id: id });

    ctx.response.status = 200;
    ctx.response.body = {
      status_code: 200,
      message: "Delete post successfully!",
    };
  } catch (err) {
    ctx.response.status = 400;
    ctx.response.body = { err: err.message };
  }
};

module.exports = removePost;
