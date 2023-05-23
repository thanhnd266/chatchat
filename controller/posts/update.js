const { default: mongoose } = require("mongoose");
const PostSchema = require("../../models/Posts");
const cloudinaryUpload = require("../../helpers/cloudinaryUpload");

const updatePost = async (ctx) => {
  const { id } = ctx.request.params;
  const payloadPrimative = ctx.request.body;
  const files = ctx.request.files;

  const payload = JSON.parse(payloadPrimative.payload);

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      ctx.response.status = 404;
      ctx.response.body = {
        status_code: 404,
        message: "No Post Matching!",
      };
    }

    if (!payload.content && (files.length === 0 && payload?.availableImg?.length === 0)) {
      ctx.response.status = 403;
      ctx.response.body = {
        status_code: 403,
        message: "Posts must have content",
      };
      return;
    }

    // Upload image to cloudinary
    const listLinkImage = await Promise.all(
      files?.map((item) => {
        return cloudinaryUpload(item, payload.userId);
      })
    );

    let imgUrl = listLinkImage.map((item) => {
      return item.secure_url;
    });

    if(payload.availableImg?.length > 0) {
      imgUrl = [...imgUrl, ...payload.availableImg]
    }

    const postUpdate = await PostSchema.findOneAndUpdate(
      { _id: id },
      {
        ...payload,
        image: [...imgUrl],
      },
      { new: true }
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
