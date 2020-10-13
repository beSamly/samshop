import AdminRouteLayout from "./AdminRouteLayout";
import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from "./apiAdmin";
import fixedSize from '../core/fixedSizeTable'
import Loader from "../core/Loader";


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

        const [formDataPhotos, setFormDataPhotos] = useState([])

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

        const handleChange = name => event => {
            if (name === "photos") {
                var arr = []
                var length = event.target.files.length
                for (let i = 0; i < length; i++) {
                    var newFormData = new FormData;
                    newFormData.append('file', event.target.files[i])
                    newFormData.append('upload_preset', 'chattr')
                    newFormData.append('folder', `samshop/`)
                    arr.push(newFormData)
                    // formData.append(`file-${i}`, event.target.files[i])
                }
                setFormDataPhotos([...arr])

            } else {
                const value = event.target.value;
                setValues({ ...values, [name]: value });
            }
        };

        const uploadPhotos = async () => {
            var photos = []
            var length = formDataPhotos.length
            console.log("formDataPhotos : before loop ", formDataPhotos)
            for (let i = 0; i < length; i++) {

                var res = await fetch('https://api.cloudinary.com/v1_1/ddd5rvj1e/image/upload', {
                    method: 'POST',
                    body: formDataPhotos[i]
                })

                const file = await res.json()
                photos.push({ image_url: file.secure_url })
            }
            return photos
        }

        const clickSubmit = async (e) => {
            e.preventDefault();


            for (let key in values) {
                console.log(values[key])
                formData.append(key, JSON.stringify(values[key]))
            }
            var uploadedPhotos = await uploadPhotos()
            console.log("uploadedPhotos : ", uploadedPhotos)
            await formData.append('photos', JSON.stringify(uploadedPhotos))


            setOtherValue({ ...otherValue, error: "", loading: true });
            createProduct(user._id, token, formData).then(data => {
                if (data.error) {
                    setOtherValue({ ...otherValue, error: data.error });
                }
                else {
                    window.location.reload()
                }
                window.scrollTo(0, 0);
            });
        };

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
                            <select className={`form-control size-field-${i}`} onChange={handleDetail(i, 'size')} required>
                                <option value="" selected>Select size</option>
                                {fixedSize.map((c) =>
                                    <option value={c} >{c}</option>
                                )}
                            </select>
                        </div>

                        <div className="col-2">
                            <label className="text-muted">quantity</label>
                            <input
                                required
                                type="number"
                                className={`form-control quantity-field-${i}`}
                                value={c.quantity}
                                onChange={handleDetail(i, 'quantity')}
                            />
                        </div>
                        <div className="col-2">
                            <label className="text-muted">price</label>
                            <input
                                required
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
                        <input type="file" name="filefield" multiple="multiple" onChange={handleChange("photos")} required></input>
                    </label>
                </div>

                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                        required
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
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Price</label>
                    <input
                        required
                        onChange={handleChange("price")}
                        type="number"
                        className="form-control"
                        value={price}
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Category</label>
                    <select
                        required
                        onChange={handleChange("category")}
                        className="form-control"
                    >
                        <option value="" selected>Please select</option>
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
                        required
                        onChange={handleChange("shipping")}
                        className="form-control"
                    >
                        <option value="" selected>Please select</option>
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
                {JSON.stringify(error)}
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
                <Loader loading={loading} />
                <div className="row justify-content-center admin-product-create-content">
                    <div className="col-10">
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
