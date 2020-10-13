const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const reviewsSchema = new mongoose.Schema({
    reviewer: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        required: true,
        maxlength: 2000
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const detailsSchema = new mongoose.Schema({
    color: String,
    size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "FREE-SIZE",
        "230", "235", "240", "245", "250", "255", "260",
        "265", "270", "275", "280", "285", "290", "295",
    ],
    },
    quantity: Number,
    price: Number
})


const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 40
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000
        },
        price: {
            type: Number,
            trim: true,
            default: 10,
            maxlength: 32
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true
        },

        sold: {
            type: Number,
            default: 0
        },
        photos: [
           
        ],

        shipping: {
            required: false,
            type: Boolean
        },
        reviews: [reviewsSchema],
        totalRate: {
            min: 0,
            max: 5,
            type: Number
        },
        details: [detailsSchema]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
