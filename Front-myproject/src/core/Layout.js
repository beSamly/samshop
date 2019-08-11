import React, { useState, useEffect } from "react";
import Signin from '../user/Signin';
import Signup from '../user/Signup';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({
    children,
    className="",
    keywordIn=""
}) => {
    return (
        <div>
            <Signin />
            <Signup />
            <Navbar keywordIn={keywordIn} />
            <div className={className}>{children}</div>
            <Footer />
        </div>
    )
}

export default Layout