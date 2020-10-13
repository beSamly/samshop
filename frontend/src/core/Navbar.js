import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import { getCategories } from "./apiCore";
import { getCart } from "./cartHelpers";
import NavCartItem from "./NavCartItem";

import SignIn from "../user/SignOptions/SignIn"
import SignUp from "../user/SignOptions/SignUp"

const Navbar = ({ history, keywordIn = "" }) => {
    const [categories, setCategories] = useState()
    const [keyword, setKeyword] = useState(keywordIn)
    const [cartItems, setCartItems] = useState()

    const [modalOpened, setModalOpened] = useState(false)
    // 0 for sign in and 1 for sign up / -1 for not opened
    const [visible, setVisible] = useState(-1)

    const handleChange = (e) => {
        var value = e.target.value
        setKeyword(value)
    }

    const handleClick = () => {
        var a = document.querySelector('.search-bar').value
        history.push(`/products?keyword=${a}`)
    }

    const init = () => {
        document.querySelector('#inputSMEx').addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                handleClick()
            }
        })
    }

    useEffect(() => {
        getCategories().then(data => setCategories(data))
        init()
    }, [])


    const dropdown = () => {
        var a = []
        return categories ? (
            <ul className="drop-down ">
                {categories.map((c) =>
                    <Link to={`/products?category=${c._id}`}><li title={c._id} class="drop-down-item">{c.name}
                    </li></Link>
                )}
            </ul>
        ) : ""
    }
    const { user } = isAuthenticated()



    const showIcon = () => {
        return (
            <div class="row align-items-center icon-container ">
                <div className="d-inline-block   cart-icon-box position-relative">
                    <Link to={'/cart'}>
                        {showNumOfItemInCart()}
                        <NavCartItem items={items} />
                        <i class="fas grey-text  fa-luggage-cart fa-1x "></i>
                    </Link>
                </div>
            </div>
        )
    }

    const showUserMenu = () => {
        if (isAuthenticated() && user.role === 1) {
            return (
                <div className="row align-items-center">
                    {showIcon()}
                    <Link to={'/admin/dashboard/product/create'}><button class="btn btn-warning px-2 py-2">Admin</button></Link>
                    <button class="btn btn-default" onClick={() =>
                        signout(() => {
                            history.push("/");
                        })
                    }>Sign out</button>
                </div>
            )
        }
        if (isAuthenticated() && user.role !== 1) {
            return (
                <div className="row align-items-center">
                    <div className="user-option-box row AIC ">
                        {showIcon()}
                        <div className=" user-option-btn m-0" >
                            <Link to={'/user/dashboard/profile'}>
                                User options
                             </Link>
                            <div className="user-dropdown">
                                <ul>
                                    <Link to={'/user/dashboard/profile'}><li className="user-dropdown-item">Profile</li></Link>
                                    <Link to={'/user/dashboard/history'}><li className="user-dropdown-item">Order history</li></Link>
                                    <li className="user-dropdown-item" onClick={() =>
                                        signout(() => {
                                            history.push("/");
                                        })
                                    }>Sign Out</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>
            )
        }
    }

    const showSignMenu = () => {
        return !isAuthenticated() && (
            <div class="row align-items-center">
                {showIcon()}
                <span class="text-center " >
                    <span href="" class="btn btn-default btn-rounded " onClick={() => { setVisible(0) }} >Sign in</span>
                </span>
                <span class="text-center px-0">
                    <span href="" class="btn btn-default btn-rounded " onClick={() => { setVisible(1) }} >Sign up</span>
                </span>
            </div>
        )
    }

    const showNumOfItemInCart = () => {
        var items = getCart()

        var length = items.length
        return (
            <div className="cart-item-number">
                {length}
            </div>
        )
    }

    const showNavbar = () => {
        return (
            <>
                <div className="top-banner row align-items-center justify-content-center">
                    <span>
                        Be members only pricing with a 30-day money-back guarantee| Enjoy the benefits of Sammie Shop.
                    </span>
                </div>
                <nav className="nav-bar row justify-content-conter ">
                    <ul className=" first row align-items-center">
                        <Link to={'/'}><li className="d-inline-block"><img src="/img/logo-image2.png" ></img></li></Link>
                        <Link to={'/products'}>
                            <li className="drop-down-btn  d-inline-block position-relative"><i class="fas fa-th grey-text "></i>Category
                                {dropdown()}
                            </li>
                        </Link>
                    </ul>
                    <div className="second">
                        <div class="">
                            <input type="text" id="inputSMEx" class="search-bar form-control form-control-sm m-0 w-85 d-inline-block" value={keyword} onChange={handleChange} placeholder="Search for anything" />
                            <button className="btn btn-danger  search-button" onClick={handleClick}>
                                <i class="fas fa-search fa-xs " ></i>
                            </button>
                        </div>
                    </div>
                    <div className="third row align-items-center ">
                        {showSignMenu()}
                        {showUserMenu()}
                    </div>
                </nav >
            </>
        )
    }

    var items = getCart()

    const flipVisibility = () => {
        if (visible === 1) {
            setVisible(0)
        } else {
            setVisible(1)
        }
    }

    return (
        <div className="navbar-cont">
            <SignIn visible={visible} closeForm={() => { setVisible(-1) }} flipVisibility={flipVisibility} history={history} />
            <SignUp visible={visible} closeForm={() => { setVisible(-1) }} flipVisibility={flipVisibility} history={history} />
            {showNavbar()}
        </div>
    )
};

export default withRouter(Navbar);
