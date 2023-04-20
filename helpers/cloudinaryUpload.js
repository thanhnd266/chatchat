const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const cloudinaryUpload = async (file, userId) => {
  const uploadedImg = await cloudinary.uploader.upload(
    file.path,
    {
      upload_preset: "ChatsApp_Preset",
      public_id: `${userId}-${Date.now()}`,
      allowed_formats: ["jpg", "png", "jpeg", "gif", "svg", "ico", "webp"],
    },
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        fs.unlinkSync(file.path);
        return result;
      }
    }
  );

  return uploadedImg;
};

module.exports = cloudinaryUpload;
