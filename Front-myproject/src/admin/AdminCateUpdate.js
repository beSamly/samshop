import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import AdminRouteLayout from "./AdminRouteLayout";

import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getCategories } from "./apiAdmin";
import reactElementToJSXString from 'react-element-to-jsx-string'
import { renderToString } from 'react-dom/server'
import fixedSize from '../core/fixedSizeTable'
import Loader from "../core/Loader";


const AdminCateUpdate = () => {
  


    return (
        <div>
            amange
        </div>
    )
}

export default AdminCateUpdate