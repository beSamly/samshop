const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            lowercase: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
        hashed_password: {
            type: String,
            required: true
        },
        about: {
            type: String,
            trim: true,
            default: ""
        },
        salt: String,
        role: {
            type: Number,
            default: 0,
            max: 1
        },
        history: {
            type: Array,
            default: []
        },
        addresses: {
            address1: {
                type: String,
                default:""
            },
            address2: {
                type: String,
                default:""
            },
            city: {
                type: String,
                default:""
            },
            province: {
                type: String,
                default:""
            },
            zipcode: {
                type: Number,
                default:0
            }
        }
    },
    { timestamps: true }
);

// Virtual field
userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainText) {
        console.log("did it come?")
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);
