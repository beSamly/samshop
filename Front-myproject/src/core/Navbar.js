import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import { getCategories } from "./apiCore";
import { getCart } from "./cartHelpers";
import NavCartItem from "./NavCartItem";

const Navbar = ({ history, keywordIn = "" }) => {
    const [categories, setCategories] = useState()
    const [keyword, setKeyword] = useState(keywordIn)
    const [cartItems, setCartItems] = useState()

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
        // if (!categories) {
        //     getCategories().then(data => setCategories(data))
        // }

        getCategories().then(data => setCategories(data))
        // setCartItems(getCart())
        init()
    }, [])


    const dropdown = () => {
        var a = []
        return categories ? (
            <ul className="drop-down">
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
            <div class="row align-items-center ">
                <div className="d-inline-block  p-3"><i class="fab grey-text fa-medapps fa-1x "></i></div>
                <div className="d-inline-block  p-3  cart-icon-box position-relative">
                    <Link to={'/cart'}>
                        {showNumOfItemInCart()}
                        <NavCartItem items={items} />
                        <i class="fas grey-text  fa-luggage-cart fa-1x "></i>
                    </Link>
                </div>
                <div className="d-inline-block p-3"><i class="far grey-text fa-bell fa-1x "></i></div>
            </div>
        )
    }

    const showUserMenu = () => {
        if (isAuthenticated() && user.role === 1) {
            return (
                <div className="row align-items-center">
                    {showIcon()}
                    <Link to={'/admin/dashboard/product/create'}><button class="btn btn-warning px-3 py-2">Admin</button></Link>
                    <button class="btn btn-default px-2 py-2" onClick={() =>
                        signout(() => {
                            history.push("/");
                        })
                    }>Sign out</button>
                </div>
            )
        }
        if (isAuthenticated() && user.role !== 1) {
            return (
                <div className="row justify-content-center align-items-center">
                    {showIcon()}
                    <div className="user-option-box py-3">
                        <div className=" btn btn-info px-2 py-1 m-0">
                            <Link to={'/user/dashboard'}><span style={{ color: 'white', fontSize: 11 }}>user option</span></Link>
                        </div>
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
            )
        }
    }

    const showSignMenu = () => {
        return !isAuthenticated() && (
            <div class="row align-items-center">
                {showIcon()}
                <span class="text-center  mx-0 px-0" >
                    <a href="" class="btn btn-default btn-rounded px-3 py-2" style={{ fontSize: 14 }} data-toggle="modal" data-target="#elegantModalForm" >Sign in</a>
                </span>
                <span class="text-center px-0">
                    <a href="" class="btn btn-default btn-rounded px-3 py-2" style={{ fontSize: 14 }} data-toggle="modal" data-target="#elegantModalForm-signup" >Sign up</a>
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
            <div>
                <div className="top-banner row align-items-center justify-content-center">
                    <span>
                        Be members only pricing with a 30-day money-back guarantee| Enjoy the benefits of Sammie Shop.
                    </span>
                </div>
                <nav className="navbar navbar-expand-lg py-0">
                    <ul className="col-xl-3 col-ld-1 col-md-4 col-sm-6 col-10 my-0 px-0">
                        <Link to={'/'}><li className="d-inline-block"><img src="/img/logo-image.png" style={{ width: 110, height: 50 }}></img></li></Link>
                        <Link to={'/products'}>
                            <li className="drop-down-btn py-3 d-inline-block mx-4 position-relative"><i class="fas fa-th grey-text mr-2"></i>Category
                    {dropdown()}
                            </li>
                        </Link>
                    </ul>
                    <button class="navbar-toggler mt-2" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                        aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation" >
                        <span class="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
                    </button>
                    <div class="collapse navbar-collapse row justify-content-between align-items-center" id="basicExampleNav">
                        <div className="col-md-7">
                            <div class="md-form form-sm my-0">
                                <input type="text" id="inputSMEx" class="search-bar form-control form-control-sm m-0 w-85 d-inline-block" value={keyword} onChange={handleChange} placeholder="Search for anything" />
                                <button className="btn btn-danger m-0 px-3 py-2" onClick={handleClick}>
                                    <i class="fas fa-search fa-xs " ></i>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-5">
                            {showSignMenu()}
                            {showUserMenu()}
                        </div>
                    </div>
                </nav >
            </div>
        )
    }

    var items = getCart()

    return (
        <div >
            {showNavbar()}
        </div>
    )
};

export default withRouter(Navbar);

 // nested dropdown navbar exercise
    // const dropdown = () => {
    //     return (
    //         <ul className="drop-down">

    //             <li >Web programming
    //                                     <ul className="submenu-ul">
    //                     <li ><a href="#">React</a>
    //                         <ul className="submenu-ul2">
    //                             <li ><a href="#">Javascript</a></li>
    //                             <li ><a href="#">Css</a></li>
    //                             <li ><a href="#">Html</a></li>
    //                         </ul>
    //                     </li>
    //                     <li >PHP
    //                                         <ul className="submenu-ul2">
    //                             <li >JAVA</li>
    //                             <li >JSP</li>
    //                             <li >HIBERNATE</li>
    //                         </ul>
    //                     </li>
    //                     <li >NODE JS</li>
    //                 </ul>
    //             </li>
    //             <li >Web programming
    //                                 <ul className="submenu-ul">
    //                     <li >IOT
    //                                            <ul className="submenu-ul2 ">
    //                             <li >PI</li>
    //                             <li >PYTHON</li>
    //                             <li >FLASK</li>
    //                         </ul>
    //                     </li>
    //                     <li >APP
    //                                         <ul className="submenu-ul2">
    //                             <li >ANDROIT STUDIO</li>
    //                             <li >SWIFT</li>
    //                             <li >KOTLIN</li>
    //                         </ul>
    //                     </li>
    //                     <li >NODE JS</li>
    //                 </ul>
    //             </li>
    //             <li >Web programming</li>
    //         </ul>
    //     )
    // }