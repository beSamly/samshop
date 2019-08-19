const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
const formData = require('express-form-data')
const path = require('path');

require("dotenv").config();
// file upload test:


// import routes
const { authRoutes } = require("./routes/auth");
const { userRoutes } = require("./routes/user");
const { categoryRoutes } = require("./routes/category");
const { productRoutes } = require("./routes/product");
const { braintreeRoutes } = require("./routes/braintree");
const { orderRoutes } = require("./routes/order");

// app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("DB Connected"));

// // middlewares

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
// expressValidator for validator/index.js : it provides req.check function so on
app.use(expressValidator());
app.use(cors());


// app.get('/products', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });;
// // routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);

// Serving up react App
// app.use(express.static(path.join(__dirname, 'build')))
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });;

// app.use(morgan("dev"));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

