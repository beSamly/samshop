import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import Layout from "./Layout";
import Card from "./Card";
import { getProducts } from './apiCore'
import CateSection from "./CateSection";
import ProductCarousel from "./ProductCarousel";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import $ from 'jquery'
import { previewInit } from "./previewJquery"

console.log("what sis previewInit  : ", previewInit)
const Home = () => {
    $(document).ready(function () {
        previewInit()
    })

    const init = () => {
        getProducts("createdAt").then(data => setNewProduct(data))
        getProducts("totalRate").then(data => setTrendyProduct(data))
    }

    const [trendyProduct, setTrendyProduct] = useState([])
    const [newProduct, setNewProduct] = useState()
    const [dummy, setDummy] = useState(0)

    useEffect(() => {
        init()
    }, [])

    const addToCart = (product) => {
        addItem(product, () => {
            setDummy(dummy + 1)
        });
    };

    const landing = () => {
        return (
            <div>
                <div className="row video-container justify-content-center">
                    <div className="video-content row ">

                        <video autoplay='true' muted='true' loop="true" className="myVideo">
                            <source src="/img/fashion-film.mp4" type="video/mp4" />
                        </video>
                        <div className="video-text">
                            <span>"Reinvent your look with the latest in men's clothes, shoes and accessories.<br></br> Discover seasonal pieces in a range of styles and fits, updated weekly."</span>
                            <br></br>
                            <Link to={'/products'}><button class="btn btn-danger video-content-button">Shop now</button></Link>
                        </div>
                    </div>

                </div>
                <div className="row below-video align-items-center justify-content-between ">
                    <div className="row col-4">
                        <i class="far fa-check-circle fa-2x"></i>
                        <span className="bold"><b>100,000 online courses</b><br></br>Explore a variety of products</span>
                    </div>
                    <div className="row col-4">
                        <i class="fas fa-bullseye fa-2x"></i>
                        <span className="bold"><b>Expert customer service</b><br></br>Ask any questions</span>
                    </div>
                    <div className="row col-4">
                        <i class="fas fa-history fa-2x"></i>
                        <span className="bold"><b>Credible Refund policy</b><br></br>Shop freely</span>
                    </div>
                </div>
            </div>
        )
    }

    const showTrendProduct = () => {
        return (
            <div className="mx-2">
                <div>
                    <div className="trend-product-title row align-items-center"><i class="fab fa-hotjar fa-2x"></i>Our Trendy products</div>
                </div>
                <div className="row">
                    {trendyProduct.map((product, index) => {
                        return (<div className="col-3">
                            <Card product={product} forWhat="trendyProduct" index={index} addToCartcallback={addToCart} />
                        </div>)
                    })}
                </div>
            </div>
        )
    }

    const showNewProduct = () => {
        return (
            <div className="mx-2">
                <div>
                    <div className="new-product-title row align-items-center">
                        <i class="fas fa-check-double fa-2x"></i>
                        New Arrival
                    </div>
                </div>
                <div className="row">
                    {newProduct.map((product, index) => {
                        return (<div className="col-3">
                            <Card product={product} forWhat="newProduct" index={index} addToCartcallback={addToCart} />
                        </div>)
                    })}
                </div>
            </div>
        )
    }

    return newProduct ? (
        <Layout>
            {/* {landing()} */}
            {showTrendProduct()}
            <CateSection />
            {showNewProduct()}
            {/* <ProductCarousel products={trendyProduct} addToCartcallback={addToCart} /> */}
        </Layout>
    ) : ""

}

export default Home