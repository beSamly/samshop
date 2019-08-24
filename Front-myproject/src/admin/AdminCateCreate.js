import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import AdminRouteLayout from "./AdminRouteLayout";

import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories, createCategory } from "./apiAdmin";
import reactElementToJSXString from 'react-element-to-jsx-string'
import { renderToString } from 'react-dom/server'
import fixedSize from '../core/fixedSizeTable'
import Loader from "../core/Loader";


const AdminCateCreate = () => {

    const [values, setValues] = useState({
        name: "",
        loading: false,
        error: ""
    })

    const { name, loading, error } = values
    const { user, token } = isAuthenticated();
    const userId = user._id

    const showError=()=>{
        return(
            <div>
                {error}
            </div>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createCategory(userId, token, {name}).then(res => {
            if (res.error) {
                console.log("error in category create : " , res.error)
                setValues({ ...values, error: res.error })
            } else{
                alert("new category is created")
                setValues({ ...values, name:""})
            }
        })
    }

    const handleChange=(e)=>{
        var value = e.target.value
        setValues({...values, name: value})
    }

    const showForm=()=>{
        return(
            <form onSubmit={handleSubmit} className="form-control">
                <label>Category name</label>
                <input required value={name} onChange={handleChange} className="form-control"></input>
                <button className="btn btn-primary">submit</button>
            </form>
        )
    }

    return (
        <AdminRouteLayout>
            {showError()}
            {showForm()}
        </AdminRouteLayout>
    )
}

export default AdminCateCreate