import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import AdminRouteLayout from "./AdminRouteLayout";

import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from "./apiAdmin";
import reactElementToJSXString from 'react-element-to-jsx-string'
import { renderToString } from 'react-dom/server'

// const AdminProductCreate = () => {
//     const []
//     const showForm=()=>{
//         <div>
//             <label>name</label>
//                 <input value={product.name} />
//         </div>  
//     }

//     return(
//         <AdminRouteLayout>
//             {showForm()}
//         </AdminRouteLayout>
//     )
// }



const AdminProductCreate = () => {
    {
        const [numOfDetail, setNumOfDetail] = useState(1)
        const [values, setValues] = useState({
            name: "",
            description: "",
            price: "",
            categories: [],
            photos: [],
            category: "",
            shipping: "",
            quantity: "",
            loading: false,
            error: "",
            details:[{color:"",size:"", quantity:"", price:""}],
            createdProduct: "",
            redirectToProfile: false,
            formData: ""
        });

        const { user, token } = isAuthenticated();
        const {
            name,
            description,
            price,
            categories,
            category,
            photos,
            shipping,
            loading,
            error,
            createdProduct,
            redirectToProfile,
            details,
            formData
        } = values;

        // load categories and set form data
        const init = () => {
            getCategories().then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        categories: data,
                        formData: new FormData()
                    });
                }
            });
        };

        useEffect(() => {
            init();
        }, []);

        const handleChange = name => event => {
            if (name === "photos") {
                var arr=[]
                var length = event.target.files.length
                console.log("what is e.t.f[0] : ", event.target.files[0])
                for (let i = 0; i < length; i++) {
                    formData.append(`file-${i}`, event.target.files[i])
                    // arr.push(event.target.files[i])
                }
                // formData.append('photos', JSON.stringify(arr))

            } else {
                const value = event.target.value;
                formData.set(name, value);
                setValues({ ...values, [name]: value });
            }
        };

        const clickSubmit = e => {
            e.preventDefault();
            var details = []
            for (let i = 1; i <= numOfDetail; i++) {
                var colorField = e.target.querySelector(`.color-field-${i}`)
                var sizeField = e.target.querySelector(`.size-field-${i}`)
                var quantityField = e.target.querySelector(`.quantity-field-${i}`)
                var priceField = e.target.querySelector(`.price-field-${i}`)

                colorField && sizeField && quantityField && (
                    details.push({
                        color: colorField.value,
                        size: sizeField.value,
                        quantity: quantityField.value,
                        price: priceField.value
                    })
                )
            }
    
            formData.set('details',JSON.stringify(details))

            

            setValues({ ...values, error: "", loading: true });
            createProduct(user._id, token, formData).then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        photo: "",
                        price: "",
                        quantity: "",
                        loading: false,
                        createdProduct: data.name
                    });
                }
            });
        };

        const handleDelete = (e) => {
            var targetToDelete = e.target.parentElement
            var targetOfParent = targetToDelete.parentElement
            targetOfParent.removeChild(targetToDelete)
        }

        const addMoreBox = () => {
            const detailsItem = (i) => {
                return (
                    <div className="row details-item align-items-center">
                        <div className="col-3">
                            <label className="text-muted">color</label>
                            <input
                                type="text-muted"
                                className={`form-control color-field-${i}`}
                            />
                        </div>
                        <div className="col-2">
                            <label className="text-muted">size</label>
                            <input
                                type="text-muted"
                                className={`form-control size-field-${i}`}
                            />
                        </div>
                        <div className="col-2">
                            <label className="text-muted">quantity</label>
                            <input
                                type="number"
                                className={`form-control quantity-field-${i}`}
                            />
                        </div>
                        <div className="col-2">
                            <label className="text-muted">price</label>
                            <input
                                type="number"
                                className={`form-control price-field-${i}`}
                            />
                        </div>
                        <span className="btn btn-danger px-3 py-1 delete-button" onClick={handleDelete}>X</span>
                    </div>
                )
            }
            var arr = []
            for (let i = 1; i <= numOfDetail; i++) {
                arr.push(detailsItem(i))
            }

            return arr
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
                <legend>Details<span className="btn btn-primary add-button" onClick={() => { setNumOfDetail(numOfDetail + 1) }}>+</span></legend>
                <div className="form-group details-box">
                  
                    {addMoreBox()}
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
                <div className="row justify-content-center">
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
