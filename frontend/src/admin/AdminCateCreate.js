import AdminRouteLayout from "./AdminRouteLayout";
import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { createCategory } from "./apiAdmin";

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
            <form onSubmit={handleSubmit} className="form-control create-category-cont">
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