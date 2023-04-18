const multer = require("@koa/multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (ctx, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (ctx, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const imageFilter = (ctx, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("File is not image"));
  }

  cb(null, true);
};

module.exports = multer({ storage: storage, fileFilter: imageFilter });
