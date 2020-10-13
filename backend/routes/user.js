const User = require("../models/user");
const { Order } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");

const userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};

const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

const update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
    );
};

exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];
    console.log("req.bodu in addOrderToUserHistory", req.body)
    history.push({
        products: req.body.order.products,
        addresses: req.body.order.addresses,
        transaction_id: req.body.order.transaction_id,
        totalPrice: req.body.order.totalPrice
    });

    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { history: history } },
        { new: true },
        (error, data) => {
            if (error) {
                console.log("error in addOrderToUserHistory :")
                return res.status(400).json({
                    error: "Could not update user purchase history"
                });
            } else {
                next();
            }
        }
    );

};

exports.userById = userById

const purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .populate("products.product")
        .sort("-created")
        .sort({ 'createdAt': 'desc' })
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};


// !!! ROUTE
const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../routes/auth");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);
router.get("/orders/by/user/:userId", requireSignin, isAuth, purchaseHistory);

router.param("userId", userById);

exports.userRoutes = router;
