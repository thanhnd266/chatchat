const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
        },
        userId: {
            type: String,
        },
        content: {
            type: String,
        }
    },
    { timestamps: true }
)

CommentSchema.index({ postId: 1 });

module.exports = mongoose.model('Comment', CommentSchema);