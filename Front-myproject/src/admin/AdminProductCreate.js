import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import AdminRouteLayout from "./AdminRouteLayout";

import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from "./apiAdmin";
import reactElementToJSXString from 'react-element-to-jsx-string'
import { renderToString } from 'react-dom/server'
import fixedSize from '../core/fixedSizeTable'


const AdminProductCreate = () => {
    {
        const [numOfDetail, setNumOfDetail] = useState(1)
        const [values, setValues] = useState({
            name: "",
            description: "",
            price: "",
            photos: [],
            category: "",
            shipping: "",
            details: [{ color: "", size: "", quantity: "", price: "" }],
        });

        const [otherValue, setOtherValue] = useState({
            categories: [],
            loading: false,
            error: "",
            createdProduct: "",
            redirectToProfile: false,
            formData: ""
        })

        const { user, token } = isAuthenticated();
        const {
            name,
            description,
            price,
            category,
            photos,
            shipping,
            details,
        } = values;

        const {
            categories,
            loading,
            error,
            createdProduct,
            redirectToProfile,
            formData
        } = otherValue

        // load categories and set form data
        const init = () => {
            getCategories().then(data => {
                if (data.error) {
                    setOtherValue({ ...otherValue, error: data.error });
                } else {
                    setOtherValue({
                        ...otherValue,
                        categories: data,
                        formData: new FormData()
                    });
                }
            });
        };

        useEffect(() => {
            init();
        }, []);

        // test!!
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
        // testend

        const handleChange = name => event => {
            if (name === "photos") {
                var arr = []
                var length = event.target.files.length
                for (let i = 0; i < length; i++) {
                    formData.append(`file-${i}`, event.target.files[i])
                }

            } else {
                const value = event.target.value;
                setValues({ ...values, [name]: value });
            }
        };

        const clickSubmit = e => {
            e.preventDefault();

            for (let key in values) {
                console.log(values[key])
                formData.append(key, JSON.stringify(values[key]))
            }

            setOtherValue({ ...otherValue, error: "", loading: true });
            createProduct(user._id, token, formData).then(data => {
                if (data.error) {
                    setOtherValue({ ...otherValue, error: data.error });
                }
                if (!data.error) {
                    window.location.reload()
                }
                else {
                    setOtherValue({ ...otherValue, error: "All field is required" })
                }
                window.scrollTo(0, 0);

            });
        };
        console.log("what is data : ", values)
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
                            {/* <input
                                type="text-muted"
                                className={`form-control size-field-${i}`}
                                value={c.size}
                                onChange={handleDetail(i, 'size')}
                            /> */}
                            <select className={`form-control size-field-${i}`} onChange={handleDetail(i, 'size')}>
                                <option value={""} >Select size</option>
                                {fixedSize.map((c) =>
                                    <option value={c} >{c}</option>
                                )}
                            </select>
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
            <form className="mb-3 product-create-form" onSubmit={clickSubmit}>
                <label className="text-muted">Add photo</label>

                <div className="form-group">
                    <label className="btn btn-secondary w-100">
                        <input type="file" name="filefield" multiple="multiple" onChange={handleChange("photos")}></input>
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
                                <option key={i} value={c._id}>
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
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                {/* Details box */}
                <legend>Details<span className="btn btn-primary add-button" onClick={addMoreBox}>+</span></legend>
                <div className="form-group details-box">
                    {showDetails()}
                </div>
                <button className="btn btn-outline-primary">Create Product</button>
            </form>
        );

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
                <h2>{`${createdProduct}`} is created!</h2>
            </div>
        );

        const showLoading = () =>
            loading && (
                <div className="alert alert-success">
                    <h2>Loading...</h2>
                </div>
            );

        return (
            <AdminRouteLayout
                title="Add a new product"
                description={`G'day ${user.name}, ready to add a new product?`}
            >
                <div className="row justify-content-center admin-product-create-content">
                    <div className="col-10">
                        {showLoading()}
                        {showSuccess()}
                        {showError()}
                        {newPostForm()}
                    </div>
                </div>
            </AdminRouteLayout>
        );
    };
}
    ;

export default AdminProductCreate
