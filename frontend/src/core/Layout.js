import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Layout = ({
    children,
    className = "",
    keywordIn = ""
}) => {
    return (
        <div>
            <div className="navbar-wrapper">
                <Navbar keywordIn={keywordIn} />
            </div>
            <div className="children-wrapper">{children}</div>
        </div>
    )
}

export default Layout