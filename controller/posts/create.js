const PostSchema = require("../../models/Posts");
const User = require("../../models/User");
const cloudinaryUpload = require("../../helpers/cloudinaryUpload");

const createPost = async (ctx) => {
  const payloadPrimative = ctx.request.body;
  const files = ctx.request.files;

  const payload = JSON.parse(payloadPrimative.payload);

  try {
    if (!payload.userId || !payload.public_status) {
      ctx.response.status = 403;
      ctx.response.body = {
        status_code: 403,
        message: "Invalid parameters",
      };

      return;
    }

    if (!payload.content && files.length === 0) {
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

    // Upload image to cloudinary
    const listLinkImage = await Promise.all(
      files?.map((item) => {
        return cloudinaryUpload(item, payload.userId);
      })
    );
    
    const imgUrl = listLinkImage.map((item) => {
      return item.secure_url;
    });


    const newPost = await PostSchema.create({
      ...payload,
      image: [...imgUrl],
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
