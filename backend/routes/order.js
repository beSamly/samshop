// !!!controller
const { Order, CartItem } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");

const orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};

const create = (req, res) => {

    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    console.log("What is new roder : " , order)
    order.save((error, data) => {
        if (error) {
            console.log("error in createOrder: ", error)
            return res.status(400).json({
                error: errorHandler(error)
            });
        } else{
            console.log("succesful")
            res.json(data);
        }
    });
};

const listOrders = (req, res) => {
    Order.find()
        .populate("user", "_id name address")
        .sort("-created")
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders);
        });
};

const getStatusValues = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
};

const updateOrderStatus = (req, res) => {
    Order.update(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(order);
        }
    );
};

// !!! router
const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../routes/auth");
const { userById, addOrderToUserHistory } = require("../routes/user");

const { decreaseQuantity } = require("../routes/product");

router.post( "/order/create/:userId", requireSignin, isAuth, addOrderToUserHistory,  create);
router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders);
router.get( "/order/status-values/:userId", requireSignin, isAuth, isAdmin, getStatusValues);
router.put( "/order/:orderId/status/:userId", requireSignin, isAuth, isAdmin, updateOrderStatus);

router.param("userId", userById);
router.param("orderId", orderById);

exports.orderRoutes = router;
