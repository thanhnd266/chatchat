const handleChangeAvatar = (ctx) => {
  console.log(ctx.file);

  ctx.body = {
    status_code: 200,
    message: "Image uploaded successfully",
  };
};

module.exports = {
  handleChangeAvatar,
};
