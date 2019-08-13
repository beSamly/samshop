import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import { getCategories } from "./apiCore";
import { getCart } from "./cartHelpers";
import { API } from '../config'

const NavCartItem = ({ items, url = 'product' }) => {

    const [cartItems, setCartItems] = useState()

    const init = () => {

    }

    useEffect(() => {
        setCartItems(items)
    }, [items])



    const showItems = () => {
        return cartItems.map((c) =>
            <Link to={`/product/${c.product._id}`}>
                <div className="row nav-cart-item">
                    <div className="col-4">
                        <img class="d-block w-100" src={`${API}/${url}/photo/${c.product._id}/1`} />
                    </div>
                    <div className="col-8">
                        <div className="product-name">{c.product.name} </div>
                        <div className="description">{c.product.description} </div>
                    </div>
                </div>
            </Link>
        )
    }
    console.log("whats is times : ", items)
    return cartItems ? (
        <div className="nav-cart-item-box">
            {showItems()}
        </div>
    ) : ""
}

export default NavCartItem