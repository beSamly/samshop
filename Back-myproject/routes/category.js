// !!! controller
const Category = require("../models/category");
// const { errorHandler } = require("../helpers/dbErrorHandler");

const categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category does not exist"
            });
        }
        req.category = category;
        next();
    });
};

const create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err.message
            });
        }
        res.json({ data });
    });
};

const read = (req, res) => {
    return res.json(req.category);
};

const update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

const remove = (req, res) => {
    const category = req.category;
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Category deleted"
        });
    });
};

const list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

// !!! route
const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../routes/auth");
const { userById } = require("../routes/user");
// CRUD
router.get("/category/:categoryId", read);
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, update);
router.delete( "/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, remove);

// SHOW FULL LIST OF CATEGORY
router.get("/categories", list);

router.param("categoryId", categoryById);
router.param("userId", userById);

exports.categoryRoutes = router;
