const PostSchema = require("../../models/Posts");
const UserSchema = require("../../models/User")

const likePost = async (ctx) => {
    const { userId } = ctx.request.body;
    const { id } = ctx.request.params;


    try {
        if(!userId) {
            ctx.response.status = 404;
            ctx.response.body = {
                status_code: 404,
                message: "No User Matching!",
            };
            return;
        }

        const userLiked = await UserSchema.findOne({ _id: userId }).lean();

        if(!userLiked) {
            ctx.response.status = 404;
            ctx.response.body = {
                status_code: 404,
                message: "No User Matching!",
            };
            return;
        }

        const postLiked = await PostSchema.findOne({ _id: id }).lean();
        
        if(!postLiked) {
            ctx.response.status = 404;
            ctx.response.body = {
                status_code: 404,
                message: "No Post Matching!",
            };
            return;
        }

        const postUpdate = await PostSchema.findOneAndUpdate(
            { _id: id },
            {
                ...postLiked,
                likes: [...postLiked.likes, {
                    userId: userId,
                    username: userLiked.username,
                }]
            },
            { new: true }
        )

        if(!postUpdate) {
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
            message: "Like post successfully!",
            data: postUpdate,
        }

    } catch(err) {
        ctx.response.status = 500;
        ctx.response.body = {
            status_code: 500,
            message: err.message,
        }
    }
}

module.exports = likePost;