import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import ShowImage from './ShowImage'
import moment from "moment";
import { API } from '../config'
import Review from "./Review";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const CardPreview = ({ product, forWhat = "normal", linkTo = '/product/', index, addToCartcallback }) => {

    const showAvatar = (name, reviewerId) => {
        var res = reviewerId.slice(2, 8)
        var matches = name.match(/\b(\w)/g); // ['J','S','O','N']
        var acronym = matches.join('').toUpperCase(); // JSON

        var bgColor = `#${res}`
        return (
            <div className="review-avatar" style={{ backgroundColor: bgColor }}>
                {acronym}
            </div>
        )
    }

    const showReview = () => {
        var reviews = product.reviews
        var length = product.reviews.length
        var limit = 5
        var skip = 0

        // let pageNumberNeeded = Math.ceil(reviews.length / limit)
        // var currentPage = (myFilters.skip / myFilters.limit) + 1
        var returnArr = []

        if (reviews.length !== 0) {
            var arr = reviews.map((c, index) => {
                if (c.reviewer && skip <= index && index < skip + limit) {
                    var star = Math.floor(c.rating)
                    var remaining = c.rating % 1 >= 0.5 ? 1 : 0
                    var starArr = []
                    for (var i = 0; i < star; i++) {
                        starArr.push(<i class="fas fa-star" style={{ color: '#f4c150' }}></i>)
                    }
                    if (remaining === 1) {
                        starArr.push(<i class="fas fa-star-half-alt" style={{ color: '#f4c150' }}></i>)
                    }
                    return (
                        <div className="review-box row align-items-center">
                            <div className="">
                                {showAvatar(c.reviewer.name, c.reviewer._id)}
                            </div>
                            <div className="col-10">
                                <div className="mb-2 row">
                                    <div className="mx-2">{c.reviewer.name}</div>
                                    <div className="mx-2">{starArr}</div>
                                    <div className="mx-2">({c.rating})</div>
                                </div>
                                <div>
                                    "{c.comment}"
                        </div>
                            </div>
                        </div>
                    )
                }
            })
            return arr
        } else {
            return (
                <div>No review yet </div>
            )
        }
    }

    const showOptions = () => {
        var arr = product.details.map((c) => {
            return (
                <div>
                    {`${c.color} | ${c.size} | $${c.price} | ${c.quantity} left`}
                </div>
            )
        })
        return (
            <div className="row">
                <div className="col-1 mx-0 px-0">
                    <i class="fas fa-chevron-right mr-2"></i>
                </div>
                <div className="col-10 px-0">
                    Options available
                <i class="fas fa-arrow-down ml-2"></i>
                    {arr}
                </div>
            </div>

        )
    }

    const handleAddToCart = (e) => {
        var obj = {
            product: product,
            selectedDetails: [{
                quantity: 0,
                selectedOption: [{
                }]
            }
            ]
        }
        addToCartcallback(obj)
    };

    const dataPlacement = () => {
        return index % 4 < 2 ? "right" : "left"
    }

    return product ? (
        <div className="mb-4 card-preview" data-placement={dataPlacement()} >
            {/* <Link style={{ color: 'black' }} to={{ pathname: `${linkTo}${product._id}` }}> */}
            <div className="card-preview-body">
                <div className="product-name row">
                    <div className="col-1 mx-0 px-0">
                        <i class="fas fa-chevron-right mr-2"></i>
                    </div>
                    <div className="col-10 px-0">
                        Name: {product.name}
                    </div>
                </div>
                <div className="product-description row">
                    <div className="col-1 mx-0 px-0">
                        <i class="fas fa-chevron-right mr-2"></i>
                    </div>
                    <div className="col-10 px-0">
                        Description:
                        {product.description}
                    </div>
                </div>
                {showOptions()}
                {/* <div className="row">
                    <div className="col-1 mx-0 px-0">
                        <i class="fas fa-chevron-right mr-2"></i>

                    </div>
                    <div className="col-10 px-0">
                        Review
                         <i class="far fa-thumbs-up ml-2"></i>
                        {showReview()}
                    </div>
                </div> */}
            </div >
            <div className="row justify-content-center ">
                <button className="btn-danger add-to-cart-btn" onClick={handleAddToCart}>Add To Cart</button>
            </div>
            {/* </Link> */}
        </div>
    ) : ""
}

export default CardPreview