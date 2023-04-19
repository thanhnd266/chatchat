const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    public_status: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    image: {
      type: Array,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

PostSchema.index({ userId: 1 });

module.exports = mongoose.model("Post", PostSchema);
