import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import { getCategories } from "./apiCore";
import { getCart } from "./cartHelpers";
import NavCartItem from "./NavCartItem";
import ProductCarousel from "./ProductCarousel";

const CateSection = () => {

    const showCateSection = () => {
        return (
            <div className="row category-cont">
                <div className="col-3 row justify-content-center align-items-center cate-section-item">
                    <Link to={'/products?category=5d5fe94b717b8847484696d1'}>
                        <img src='/img/cate-section-female-top.jpg' />
                    </Link>
                    <div className="cate-section-item-content">
                        Female top
                    </div>
                </div>

                <div className="col-3 row justify-content-center align-items-center cate-section-item">
                    <Link to={'/products?category=5d60dcc85687640017c82dd4'}>
                        <img src='/img/cate-section-female-pants.jpg' />
                    </Link>
                    <div className="cate-section-item-content">
                        Female Pants
                    </div>
                </div>

                <div className="col-3 row justify-content-center align-items-center cate-section-item">
                    <Link to={'/products?category=5d60e20d5687640017c82dd8'}>
                        <img src='/img/cate-section-male-top.jpg' />
                    </Link>
                    <div className="cate-section-item-content">
                        Male Top
                    </div>
                </div>

                <div className="col-3 row justify-content-center align-items-center cate-section-item">
                    <Link to={'/products?category=5d60dcc85687640017c82dd4'}>
                        <img src='/img/cate-section-male-pants.jpg' />
                    </Link>
                    <div className="cate-section-item-content">
                        Male Pants
                    </div>
                </div>

                <div className="col-3 row justify-content-center align-items-center cate-section-item">
                    <Link to={'/products?category=5d5b89f51c9d440000c2d9c0'}>
                        <img src='/img/cate-section-accesary.jpg' />
                    </Link>
                    <div className="cate-section-item-content">
                        Accesary
                    </div>
                </div>

                <div className="col-3 row justify-content-center align-items-center cate-section-item">
                    <Link to={'/products?category=5d60e2095687640017c82dd7'}>
                        <img src='/img/cate-section-shoes.png' />
                    </Link>
                    <div className="cate-section-item-content">
                        Shoes
                    </div>
                </div>

                <div className="col-3 row justify-content-center align-items-center cate-section-item">
                    <Link to={'/products?category=5d60e20d5687640017c82dd8'}>
                        <img src='/img/cate-section-sportwear.jpg' />
                    </Link>
                    <div className="cate-section-item-content">
                        Sport Wear
                    </div>
                </div>

                <div className="col-3 row justify-content-center align-items-center cate-section-item">
                    <Link to={'/products?category=5d623850a6092000176fd215'}>
                        <img src='/img/cate-section-kid.jpg' />
                    </Link>
                    <div className="cate-section-item-content">
                        Kid
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="cate-section">
                <div className="cate-section-title">Products By Category</div>
                {showCateSection()}
            </div>
        </div>
    )
}

export default CateSection