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

const AboutHookSub2 = ({ location, size }) => {
    
    useEffect(()=>{
        alert("in aboutHooksub2")
    })

    return(
        <div>AboutHookSub2</div>
    )
}

export default AboutHookSub2