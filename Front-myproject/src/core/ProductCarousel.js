import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import { getCategories } from "./apiCore";
import { getCart } from "./cartHelpers";
import NavCartItem from "./NavCartItem";
import Card2 from "./Card2";
// import Footer from "./Footer";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import Slider from "react-slick";
import $ from 'jquery'
import CardPreview from "./CardPreview";


// receive array of products that admin want to show in carousel
const ProductCarousel = ({ products = [], addToCartcallback }) => {

    const setting = {
        // infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4
    }

    const test = () => {
        var limit = 6
        return (
            <Slider {...setting}>
                {products.map((c, index) => {
                    if (index < limit) {
                        return (
                                <Card2 product={products[index]} index={index} addToCartcallback={addToCartcallback} />
                        )
                    }
                })}
            </Slider>
        )
    }

    return products.length !== 0 && (
        <div className="mx-5 py-5 clearfix">
            <h3>Featured Products</h3>
            {test()}
        </div>
    )
}

export default ProductCarousel