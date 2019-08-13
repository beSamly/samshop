

import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";
import AdminRouteLayout from "./AdminRouteLayout";
import fs from 'fs-react'
// var a =fs()
console.log("whasti fs : ", fs)
// console.log("whasti a : ", a)
const AdminProductUpdate = ({ match, history }) => {
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        shipping: "",
        quantity: "",
        photos: [],
        loading: false,
        error: false,
        createdProduct: "",
        redirectToProfile: false,
        formData: new FormData(),
        details: []
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        category,
        shipping,
        loading,
        photos,
        error,
        createdProduct,
        redirectToProfile,
        formData,
        details,
    } = values;

    const [categories, setCategories] = useState([])

    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                console.log("wahtsi data received : ", data)
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    photos: data.photos,
                    category: data.category._id,
                    shipping: data.shipping,
                    details: data.details,
                    formData: new FormData()
                });
            }
        });
        initCategories();
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        if (name === "photo") {
            console.log("what is e.t.v : ", event.target.value)
            console.log("what is e.t.f[0] : ", event.target.files[0])
            var newPhotoArr = []

            for (var i =0 ; i < event.target.files.length ; i++){
                // var newPhoto = {}
                // newPhoto['data']= fs.readFileSync(event.target.files[i].path)
                // newPhoto['contentType']= fs.readFileSync(event.target.files[i].type)
                // newPhotoArr.push(newPhoto)
                console.log("image : ", event.target.files[i].path)
            }
        } else {
            setValues({ ...values, [name]: event.target.value });
        }
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        for (let key in values) {
            formData.append(key, JSON.stringify(values[key]))
        }

        updateProduct(match.params.productId, user._id, token, formData).then(
            data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    history.push('/admin/dashboard/product/manage')
                }
            }
        );
    };

    const handleDetail = (index, target) => (e) => {
        var newDetails = details
        var value = e.target.value
        newDetails[index][target] = value
        setValues({ ...values, details: newDetails })
    }

    const addMoreBox = () => {
        var newDetail = {}
        for (let key in details[0]) {
            if (key !== '_id') {
                newDetail[key] = ""
            }
        }
        var newDetails = details
        newDetails.push(newDetail)

        setValues({ ...values, details: newDetails })
    }

    const deleteBox = (index) => (e) => {
        var newDetails = details
        newDetails.splice(index, 1)
        alert("haeppen")
        setValues({ ...values, details: newDetails })
    }

    const showDetails = () => {
        return details.map((c, i) => {
            return (
                <div className={`row details-item-${i} align-items-center`}>
                    <div className="col-3">
                        <label className="text-muted">color</label>
                        <input
                            type="text-muted"
                            className={`form-control color-field-${i}`}
                            value={c.color}
                            onChange={handleDetail(i, 'color')}
                        />
                    </div>
                    <div className="col-2">
                        <label className="text-muted">size</label>
                        <input
                            type="text-muted"
                            className={`form-control size-field-${i}`}
                            value={c.size}
                            onChange={handleDetail(i, 'size')}
                        />
                    </div>
                    <div className="col-2">
                        <label className="text-muted">quantity</label>
                        <input
                            type="number"
                            className={`form-control quantity-field-${i}`}
                            value={c.quantity}
                            onChange={handleDetail(i, 'quantity')}
                        />
                    </div>
                    <div className="col-2">
                        <label className="text-muted">price</label>
                        <input
                            type="number"
                            className={`form-control price-field-${i}`}
                            value={c.price}
                            onChange={handleDetail(i, 'price')}
                        />
                    </div>
                    <span className="btn btn-danger px-3 py-1  mt-4 delete-button" onClick={deleteBox(i)}>X</span>
                </div>
            )
        })
    }

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                        multiple="multiple"
                    />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    onChange={handleChange("description")}
                    className="form-control"
                    value={description}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    value={price}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                >
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id} selected={c._id === category && 'selected'}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select
                    onChange={handleChange("shipping")}
                    className="form-control"
                >
                    <option>Please select</option>
                    <option value="0" selected={shipping === false && 'selected'}>No</option>
                    <option value="1" selected={shipping === true && 'selected'}>Yes</option>
                </select>
            </div>

            <legend>Details<span className="btn btn-primary add-button px-2 py-1" onClick={addMoreBox}>+</span></legend>
            <div>
                {showDetails()}
            </div>
            <button className="btn btn-outline-primary">Update Product</button>
        </form>
    );

    const showPhotos = () => {
      
    }

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: createdProduct ? "" : "none" }}
        >
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />;
            }
        }
    };

    return (
        <AdminRouteLayout>
            {showPhotos()}
            {console.log("whatsi values : ", values)}
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </AdminRouteLayout>
    );
};

export default AdminProductUpdate;
