
// !!!controller
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

const photoNumber = (req, res, next, photoNumber) => {
    req.photoNumber = photoNumber
    next()
}

const productById = (req, res, next, id) => {

    Product.findById(id)
        .populate("category")
        .populate("reviews.reviewer")
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: "Product not found"
                });
            }
            req.product = product;
            next();
        });
};

const read = (req, res) => {
    req.product.photos = undefined;
    return res.json(req.product);
};

const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {


        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // check for all fields
        const {
            name,
            description,
            category,
            shipping
        } = fields;

        if (
            !name ||
            !description ||
            !category ||
            !shipping
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        // JSON.parse(fields.photos).map((c) => {
        //     console.log(c)
        // })

        // fields.details = JSON.parse(fields.details)
        for(key in fields){
            fields[key]= JSON.parse(fields[key])
        }

        let product = new Product(fields);
        console.log("whastis fields : ", fields)
        // 1kb = 1000
        // 1mb = 1000000


        if (files) {
            // console.log("FILES PHOTO: ", files.photo);
            var photosArr = []
            for (let key in files) {
                if (files[key].size > 1000000) {
                    return res.status(400).json({
                        error: "Image should be less than 1mb in size"
                    });
                }
                // var a= fs.readFileSync(files[key].path)
                // console.log(a)
                photosArr.push({
                    data: fs.readFileSync(files[key].path),
                    contentType: files[key].type,
                })
            }
            product.photos = photosArr
        }
        console.log("new product : ", product)

        product.save((err, result) => {
            if (err) {
                console.log("err : ", err)

                return res.status(400).json({
                    error: err
                });
            }
            console.log("result : ", result)
            res.json(result);
        });
    });
};


const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Product deleted successfully"
        });
    });
};

// BIG PROBLEM changed a lot from original one
const update = (req, res) => {
    console.log("update happen")

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        var product = req.product
        for (let key in fields) {
            console.log("fileds[key] : ", fields[key], key)
            if (fields[key] !== 'undefined' && fields[key] !== undefined) {
                console.log("happen")

                product[key] = JSON.parse(fields[key])

            }
        }


        console.log("whatsi rpoduct : ", product)
        product.save((err, data) => {
            if (err) {
                console.log("wahtsi erer : ", err)
                res.status(404).json({ error: err })
            } else {
                data.photos = undefined
                console.log("wharts is dat : ", data)
                res.send(data)
            }
        })
    })

    // if (updates) {
    //     updates.map((key) => {
    //         req.product[key] = req.body[key]
    //     })
    // }

    // if (req.files) {
    //     req.files.photo.map((p) => {
    //         let photo = {
    //             data: p.data,
    //             contentType: p.mimetype
    //         }
    //         photosArr.push(photo)
    //     })
    //     product.photos = product.photos.concat(photosArr)
    // }
    // product.save((err, data) => {
    //     if (err) {
    //         res.status(404).json({ error: err })
    //     }
    //     data.photos = undefined
    //     res.send(data)
    // })
};

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */



const list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photos")
        .populate("category")
        .limit(limit)
        .sort({ [sortBy]: order })
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.send(products)
        })
};

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
 */

const listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    // Product.find({ _id: { $ne: req.product }, category: req.product.category })
    Product.find({ category: req.product.category })
        .where("_id").ne(req.product)
        .select("-photos")
        .sort([["totalRate", "desc"]])
        .limit(limit)
        .populate("category", "_id name")
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json(products);
        });
};

const listCategories = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Categories not found"
            });
        }
        res.json(categories);
    });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

//  filter : by category, by price, 
const listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let price = req.body.price ? req.body.price : []
    let category = req.body.category ? req.body.category : []
    let keyword = req.body.keyword ? req.body.keyword : ""

    let filter = {
        category: req.body.category,
        price: req.body.price
    }

    let findArgs = {};

    console.log("whatis req.body : ", req.body)
    console.log("What is filter : ", filter)
    // req.body.filters= req.body
    if (category.length !== 0) {
        findArgs['category'] = req.body.category
    }

    if (price.length !== 0) {
        var newArr = []
        req.body.price.map((c) => {
            newArr.push({
                price: {
                    $gte: JSON.stringify(c['greaterThan']),
                    $lte: JSON.stringify(c['lessThan'])
                }
            })
        })
        findArgs['$or'] = newArr
    }

    findArgs['name'] = { $regex: keyword, $options: 'x' }

    console.log("what is findArgs : ", findArgs)

    Product.count(findArgs, (err, count) => {
        Product.find(findArgs)
            .select("-photos")
            .populate("category")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: "Products not found"
                    });
                }
                res.json({
                    count,
                    data
                });
            });
    })



};

const photo = (req, res, next) => {
    if (req.product.photos) {
        res.set("Content-Type", req.product.photos[req.photoNumber].contentType)
        return res.send(req.product.photos[req.photoNumber].data);
    }

    if (req.product.photos) {
        res.set("Content-Type", req.product.photos[0].contentType)
        return res.send(req.product.photos[0].data);
    }

    next();
};

const numberOfPhoto = (req, res) => {
    let numberOfPhoto = req.product.photos.length
    res.json(numberOfPhoto)
}

const getReview = (req, res) => {
    if (req.product.review) {
        res.json(req.product.review)
    } else {
        res.status(404).json({ error: "no review found" })
    }
}



const createReview = (req, res) => {
    // inserting revies
    console.log("what isreq.body in createReview : ", req.body)
    req.product.reviews.push(req.body)

    // update totlaRating
    let product = req.product
    let sum = 0
    let length = product.reviews.length
    let avg = undefined
    if (length > 0) {
        for (let i = 0; i < length; i++) {
            sum = sum + product.reviews[i].rating
        }
        avg = sum / length
        avg = Math.round(avg * 10) / 10
        product.totalRate = avg
    } else {
        product.totalRate = 0
    }
    console.log("Wahstis product beofre save : ", product)
    product.save((err, data) => {
        if (data) {
            console.log("what is data !!: ", data)
            data.photos = undefined
            res.send(data)
        }
        if (err) {
            console.log("error : ", err)
            res.status(404).json({ "Err : ": err })
        }

    })
}

const updateReview = (req, res) => {
    var product = req.product
    var userId = req.profile._id
    // console.log("whasti sproduct : ", product)
    // console.log("whasti userId : ", userId)
    console.log("req.body fisrt : ", req.body)
    var newArr = []
    newArr = product.reviews.map((c, i) => {
        // console.log(c.reviewer._id)===parseInt(userId) , c.reviewer._id, userId)
        if (parseInt(c.reviewer._id) === parseInt(userId)) {
            console.log("we found it?")
            return {
                comment: req.body.comment,
                rating: req.body.rating,
                reviewer: userId
            }
        }
        return c
    })

    console.log("Whst is newArr : ", newArr)
    product.reviews = newArr
    product.save((err, data) => {
        if (err) {
            res.status(404).send({ error: err })
        } else {
            // console.log("data after saving : ", data)
            res.send(data)
        }
    })
}

const deleteReview = (req, res) => {
    var product = req.product
    var userId = req.profile._id

    var index = 0
    product.reviews.map((c, i) => {
        if (c.reviewer._id.toString() === userId.toString()) {
            index = i
        }
    })
    product.reviews.splice(index, 1)

    // update totlaRating
    let sum = 0
    let length = product.reviews.length
    let avg = undefined
    if (length > 0) {
        for (let i = 0; i < length; i++) {
            sum = sum + product.reviews[i].rating
        }
        avg = sum / length
        avg = Math.round(avg * 10) / 10
        product.totalRate = avg
    } else {
        product.totalRate = 0
    }

    product.save((err, data) => {
        if (err) {
            res.status(404).send({ error: err })
        } else {
            console.log("data after saving : ", data)
            res.send(data)
        }
    })
}

exports.listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: "i" };
        // assigne category value to query.category
        if (req.query.category && req.query.category != "All") {
            query.category = req.query.category;
        }
        // find the product based on query object with 2 properties
        // search and category
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(products);
        }).select("-photo");
    }
};

exports.decreaseQuantity = (req, res, next) => {

    let bulkOps = req.body.order.products.map(product => {

        var productFromDB = Product.findOne({ _id: product.product._id }).exec((err, productData) => {

            var selectedOptionId = []
            var selectedOptionQuantity = []
            product.selectedDetails.map((c) => {
                selectedOptionId.push(c.selectedOption._id)
                selectedOptionQuantity.push(c.quantity)
            })
            // productData.details= JSON.parse(productData.details)
            productData.details.map((d) => {
                var index = selectedOptionId.indexOf(d._id.toString())

                if (index !== -1) {
                    d.quantity = parseInt(d.quantity) - parseInt(selectedOptionQuantity[index])

                }
            })
            productData.save((err, data) => {
                if (err) {
                    console.log("error in decreaseQuantity :", err)
                    res.send({ error: err })
                } else {
                    console.log("succesfull and next function()")
                    next()
                }
            })
        })
    })
}

//MYSTERY
exports.decreaseQuantityOriginal = (req, res, next) => {
    let bulkOps = req.body.order.products.map(item => {
        // item.product => ARR
        // item.selectedDetails => ARR

        var filter = undefined
        var update = undefined

        item.product._id
        item.selectedDetails.map((sd) => {
            sd.selectedOptions.quantity
            sd.selectedOptions._id
        })

        return {
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        };
    });

    Product.bulkWrite(bulkOps, {}, (error, products) => {
        if (error) {
            return res.status(400).json({
                error: "Could not update product"
            });
        } else {
            next();
        }
    });
};



// !!!Router
const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../routes/auth");
const { userById } = require("../routes/user");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, remove);
router.post("/product/update/:productId/:userId", requireSignin, isAuth, isAdmin, update);

// review
// router.get("/product/review/:productId", getReview);
// router.post("/product/createreview/:productId",createReview, calculateRating);

router.post("/product/create/review/:productId", createReview);
router.post("/product/update/review/:productId/:userId", updateReview);
router.delete("/product/delete/review/:productId/:userId", deleteReview);


router.get("/products", list);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId/:photoNumber", photo);
router.get("/product/numberOfPhoto/:productId", numberOfPhoto);

// router.get("/products/search", listSearch);

router.param("userId", userById);
router.param("photoNumber", photoNumber);
router.param("productId", productById);

exports.productRoutes = router;

const testBoard = () => {


}

testBoard()