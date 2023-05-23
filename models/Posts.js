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
    }
  },
  { timestamps: true }
);

PostSchema.index({ userId: 1 });

PostSchema.statics.getPostByLimit = async function (limit, page, order, filter) {
  if(!filter) {
    filter = {}
  }

  let total = await this.aggregate([
    { $match: filter },
    { $count: "total" },
  ])

  total = (total.length > 0) ? total[0].total : 0;

  //set meta
  const pages = Math.ceil(total/limit);
  const meta = {
    "pagination": {
      page,
      limit,
      pages,
      total,
      next: (page > 0 && page < pages) ? page + 1 : null,
      prev: (page > 1 && page <= pages) ? page - 1 : null
    }
  }

  let skip = (page - 1) * limit;

  const products = await this.aggregate([
    { $match: filter },
    { $sort: order },
    { $skip: skip },
    { $limit: skip + limit },
  ])
  return { products, meta }
}

module.exports = mongoose.model("Post", PostSchema);
