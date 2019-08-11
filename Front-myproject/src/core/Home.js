import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect,Link } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import Layout from "./Layout";
import Card from "./Card";
import { getProducts } from './apiCore'
const Home = () => {

    const init = () => {
        getProducts("createdAt").then(data => setNewProduct(data))
        getProducts("totalRate").then(data => setTrendyProduct(data))
    }

    const [trendyProduct, setTrendyProduct] = useState([])
    const [newProduct, setNewProduct] = useState()

    useEffect(() => {
        init()
    }, [])

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
                    <div className="row ">
                        <i class="far fa-check-circle fa-2x"></i>
                        <span className="bold"><b>100,000 online courses</b><br></br>Explore a variety of products</span>
                    </div>
                    <div className="row">
                        <i class="fas fa-bullseye fa-2x"></i>
                        <span className="bold"><b>Expert customer service</b><br></br>Ask any questions</span>
                    </div>
                    <div className="row ">
                        <i class="fas fa-history fa-2x"></i>
                        <span className="bold"><b>Credible Refund policy</b><br></br>Shop freely</span>
                    </div>
                </div>
            </div>
        )
    }

    const showTrendProduct = () => {
        return (
            <div>
                <div>
                    <div className="trend-product-title row align-items-center"><i class="fab fa-hotjar fa-2x"></i>Enjoy Our Trendy products</div>
                </div>
                <div className="row">
                    {trendyProduct.map((product) => {
                        return (<div className="col-lg-3 col-6">
                            <Card product={product} forWhat="trendyProduct"/>
                        </div>)
                    })}
                </div>
            </div>
        )
    }

    const showNewProduct = () => {
        return (
            <div>
                <div>
                    <div className="new-product-title row align-items-center">
                        <i class="fas fa-check-double fa-2x"></i>
                        New Arrival
                    </div>
                </div>
                <div className="row">
                    {newProduct.map((product) => {
                        return (<div className="col-lg-3 col-6">
                            <Card product={product} forWhat="newProduct" />
                        </div>)
                    })}
                </div>
            </div>
        )
    }

    return newProduct?(
        <Layout>
            {landing()}
            <div className="mx-5">
                {showTrendProduct()}
                {showNewProduct()}
            </div>
        </Layout>
    ):""

}

export default Home