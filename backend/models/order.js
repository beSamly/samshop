const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const eachOrderedProductSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    selectedDetails: {},
  },
  { timestamps: true }
);


const OrderSchema = new mongoose.Schema(
  {
    products: [eachOrderedProductSchema],
    transaction_id: {},
    totalPrice: { type: Number },
    addresses: {},
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
    },
    updated: Date,
    user: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order };
