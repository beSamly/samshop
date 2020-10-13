import React, { useState, useEffect } from "react";
import {  Link } from "react-router-dom";

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
                    <div className="first">
                        {console.log("why c : ", c)}
                        {console.log("why c.product : ", c.product)}
                        {console.log("why erro : ", c.product.photos[0].image_url)}
                        <img class="d-block w-100" src={c.product.photos[0].image_url} />
                    </div>
                    <div className="second">
                        <div className="product-name">{c.product.name} </div>
                    </div>
                </div>
            </Link>
        )
    }
    return cartItems && cartItems.length!==0 ? (
        <div className="nav-cart-item-box cart-preview-cont">
            {showItems()}
        </div>
    ) : ""
}

export default NavCartItem