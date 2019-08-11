import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import Layout from "./Layout";
import Card from "./Card";
import prices from "./fixedPrice.js"
import PageButton from "./PageButton";
import queryString from 'query-string';
import { getFilteredProducts } from './apiCore'

import Filter from "./Filter2";
import AboutHookSub2 from "./AboutHookSub2";

const AboutHookSub = ({ location, size }) => {
    const [name, setName]=useState()

    useEffect(()=>{
        alert("useEffect in AboutHookSub")
        // setName("sam lee")
        // console.log("insdie useEffect")
    })

    return(
        <div>
            AboutHookSub
            {console.log("abouthooksub")}
            {console.log("size in sub : ", size)}
            <AboutHookSub2/>
        </div>
    )
}

export default AboutHookSub