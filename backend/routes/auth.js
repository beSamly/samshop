const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { userSignupValidator } = require("../validator");
const { errorHandler } = require("../helpers/dbErrorHandler");

const signup = (req, res) => {
    const user = new User(req.body);
    console.log("whati s body : ", req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: err.message
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
}

const signin = (req, res) => {
    const { password, email } = req.body

    User.findOne({ email }).exec((err, user) => {
        if (!user) {
            res.json({ error: "please check email and password" })
        }
        if (user) {
            if (!user.authenticate(password)) {
                return res.status(401).json({
                    error: "Email and password dont match"
                });
            }

            // generate a signed token with user id and secret
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            // persist the token as 't' in cookie with expiry date
            res.cookie("t", token, { expire: 900000 + Date.now() });
            // return response with user and token to frontend client
            const { _id, name, email, role } = user;
            return res.json({ token, user: { _id, email, name, role } });
        }
    })
}

const signout = (req, res) => {
    // clear coockie
    res.clearCookie("t");
    res.json({ message: "Signout success" });
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resourse! Access denied"
        });
    }
    next();
};

//!!! routers
const express = require("express");
const router = express.Router();
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

exports.authRoutes = router;
