const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: String,
        },
        senderId: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    { timestamps: true }
);

MessageSchema.index({ conversationId: 1 });

module.exports = mongoose.model('Message', MessageSchema);
