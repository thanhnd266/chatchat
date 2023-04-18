const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        category: {
            type: String,
            required: true,
        },
        subcategory:[{
            type: String,
            model:[{
                type: String,
                colour:[{
                    name: String,
                    image: String
                }],
                size:[{
                    val:Number,
                    price:Number
                }]
            }]
        }],
        price: {
            type: Number,
            required: true,
        },
        salePrice: {
            type: Number,
        },
        tag: [{
            type : String,
        }]
    },
    { timestamps: true }
);

ProductSchema.index({ category: 1, name: 1, price: 1 });

module.exports = mongoose.model('Product', ProductSchema);