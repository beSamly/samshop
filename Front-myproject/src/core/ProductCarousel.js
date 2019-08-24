import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import { getCategories } from "./apiCore";
import { getCart } from "./cartHelpers";
import NavCartItem from "./NavCartItem";
import Card2 from "./Card2";
import Footer from "./Footer";

const ProductCarousel = ({ trendyProduct, newProduct }) => {

    const show = () => {
        return (
            <div id="carousel-with-lb" class="product-carousel carousel slide carousel-multi-item" data-ride="carousel">
                <a class="btn-floating btn-secondary left-btn " href="#carousel-with-lb" data-slide="prev"><i
                    class="fas fa-chevron-left"></i></a>
                <a class="btn-floating btn-secondary right-btn" href="#carousel-with-lb" data-slide="next"><i
                    class="fas fa-chevron-right"></i></a>

                <div class="carousel-inner mdb-lightbox" role="listbox">
                    <div id="mdb-lightbox-ui"></div>
                    <div class=" carousel-item active text-center">
                        {trendyProduct.map((product) => {
                            return (
                                <figure class="col-3 d-md-inline-block">
                                    <Card2 product={product} />
                                </figure>
                            )
                        })}
                    </div>

                    <div class="carousel-item text-center">
                        {newProduct.map((product) => {
                            return (
                                <figure class="col-3 d-md-inline-block">
                                    <Card2 product={product} />
                                </figure>
                            )
                        })}

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="mx-5 py-5">
            <h3>Featured Products</h3>
            {show()}
        </div>
    )
}

export default ProductCarousel