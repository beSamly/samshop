import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import TestCarousel from "./TestCarousel";
import moment from "moment";
import { findDOMNode } from "react-dom";
import $ from "jquery";

const ProductDetail = (props) => {
    const [product, setProduct] = useState();
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState();
    const [dummy, setDummy] = useState(1)

    // $('.add-to-cart-btn').click(()=>{
    //     $(".cart-icon-box").effect("shake",{direction:"left", distance:2});
    // })

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
        
    }, [props]);

    const addToCart = () => {
        alert("add to cart!")
        addItem(product, () => {
            setDummy(dummy+1)
        });
    };



    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct({
                    product: data,
                    selectedDetails: [{
                        selectedOption: {},
                        quantity: 0
                    }],
                });
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    // const showDetails = () => {
    //     return (
    //         <select className="form-control">
    //             <option>Select option</option>
    //             {product.details.map((c, i) => {
    //                 console.log("Whats is c:", c)
    //                 return (
    //                     <option key={i} >
    //                         {`${c.color} | ${c.size} | $${c.price} | ${c.quantity} left`}
    //                     </option>
    //                 )
    //             }
    //             )}
    //         </select>
    //     )
    // }

    const showReview = () => {
        var reviews = product.product.reviews
        var arr = reviews.map((c) => {
            var star = Math.floor(c.rating)
            var remaining = c.rating % 1 >= 0.5 ? 1 : 0
            console.log("? : ", star, remaining)
            var starArr = []
            for (var i = 0; i < star; i++) {
                starArr.push(<i class="fas fa-star" style={{ color: '#f4c150' }}></i>)
            }
            if (remaining === 1) {
                starArr.push(<i class="fas fa-star-half-alt" style={{ color: '#f4c150' }}></i>)
            }
            return (
                <div className="review-box">
                    <div className="mb-2 row">
                        <div className="mx-2">{c.reviewer}</div>
                        <div className="mx-2">{starArr}</div>
                        <div className="mx-2">({c.rating})</div>
                    </div>
                    <div>
                        "{c.comment}"
                    </div>
                </div>
            )
        })
        return (
            <div className="review-container">
                <h4>Reviews</h4>
                {arr}
            </div>
        )
    }

    // test
    const handleChange = (selecteDetailIndex) => (e) => {
        var productCopy = { ...product }
        var target = productCopy.selectedDetails[selecteDetailIndex]
        target.selectedOption = JSON.parse(e.target.value)
        target.quantity = e.target.parentNode.parentNode.querySelector('.quantity').value
        setProduct(productCopy)
    }

    const handleAdd = () => {
        var productCopy = { ...product }
        productCopy.selectedDetails.push(
            {
                selectedOption: {},
                quantity: 0
            }
        )
        setProduct(productCopy)
    }

    const handleDelete = (selectedDetailIndex) => (e) => {
        var productCopy = { ...product }
        if (productCopy.selectedDetails.length !== 1) {
            productCopy.selectedDetails.splice(selectedDetailIndex, 1)
            setProduct(productCopy)
        }
    }

    // handleCahnge => get index from event.targe => go to selectedDetails field =>
    // details[index] = e.target.value and quantity
    // need to know which product and which index
    const handleQuantity = (inceaseOrDecrease, selectedDetailIndex) => (e) => {
        if (inceaseOrDecrease === "increase") {
            var productCopy = { ...product }
            var value = e.target.parentNode.querySelector('.quantity').value
            productCopy.selectedDetails[selectedDetailIndex].quantity = parseInt(value) + 1
            setProduct(productCopy)
        } else {
            var productCopy = { ...product }
            var value = e.target.parentNode.querySelector('.quantity').value
            if (value > 1) {
                productCopy.selectedDetails[selectedDetailIndex].quantity = parseInt(value) - 1
                setProduct(productCopy)
            }
        }
    }
    // index = index of item in item array
    const showDetails = () => {
        console.log("product.selectedDetails : ", product.selectedDetails)
        // i = index of selectedDetail array
        var a = product.selectedDetails.map((d, i) => {
            return (
                <div className="row">
                    <div className="col-5 px-0" >
                        <select className="form-control" onChange={handleChange(i)}>
                            <option>Select option</option>
                            {product.product.details.map((c) => {
                                return (
                                    <option value={JSON.stringify(c)} selected={isSelected(d, c)}>
                                        {`${c.color} | ${c.size} | $${c.price} | ${c.quantity} left`}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-4 px-0 row justify-content-center align-product-center">
                        <button className="btn btn-default py-1 px-3 my-2" onClick={handleQuantity('increase', i)}>+</button>
                        <input className="quantity form-control p-0 my-2 mx-0 " type="number" value={product.selectedDetails[i].quantity} style={{ width: 30 }} />
                        <button className="btn btn-default py-1 px-3 my-2" onClick={handleQuantity('decrease', i)} >-</button>
                    </div>
                    <div className="col-3 px-0 row align-product-center">
                        <button className="btn btn-primary py-1 px-3" onClick={handleAdd}>+</button>
                        <button className="btn btn-danger py-1 px-3" onClick={handleDelete(i)}>-</button>
                    </div>

                </div>
            )
        })
        return a
    }

    const isSelected = (detail, optionList) => {
        if (detail.selectedOption.color === optionList.color &&
            detail.selectedOption.size === optionList.size) {
            return "selected"
        }
    }

    // end test
    const showTotalPrice = () => {
        var totalPrice = 0
        product.selectedDetails.map((c) => {
            console.log(c.selectedOption.price, c.quantity)
            totalPrice = totalPrice + parseInt(c.selectedOption.price) * parseInt(c.quantity)
        })
        return (
            <div className="total-price">
                Total price: {!isNaN(totalPrice) ? `$${totalPrice}` : "Please select option"}
            </div>
        )
    }

    const showRating = () => {
        let target = product.product
        let arr = [];
        let avg = target.totalRate
        let length = target.reviews.length
        if (avg !== 0 && avg !== undefined) {
            let remain = Math.round(avg % 1 * 100) / 10
            for (let i = 0; i < Math.floor(avg); i++) {
                arr.push(<i class="fas fa-star" style={{ color: '#f4c150' }}></i>)
            }
            if (remain >= 5) {
                arr.push(
                    <i class="fas fa-star-half-alt" style={{ color: '#f4c150' }}></i>
                )
            }
            arr.push(
                <span>
                    <span className="mx-1 font-small" style={{ color: '#505763', fontWeight: 600 }}>{avg}</span>
                    <span className="mx-1 font-small" style={{ color: '#686f7a', fontWeight: 400 }}>({length})</span>
                </span>
            )
        } else {
            arr.push(
                <div>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <span className="mx-1 font-small" style={{ color: '#505763', fontWeight: 600 }}>No review</span>
                </div>
            )
        }
        return arr
    }

    const showNoStock = () => {
        if (product.quantity === 0)
            return (
                <div className="noStock row align-items-center justify-content-center" >

                    <div><p className="text-center m-0 p-0"><i class="far fa-times-circle fa-4x"></i></p>Out of stock</div>
                </div>
            )
    }

    const showTrendyOrNew = () => {
        var target = product.product
        const sendIcon = []
        if (target.totalRate >= 4) {
            sendIcon.push(
                <div className="trendy-item-tag">
                    HOT
                </div>
            )
        }
        var createdAt = moment(target.createdAt)
        var now = moment().format()
        var dateDifference = moment(now).diff(createdAt, 'days')
        if (dateDifference < 7) {
            sendIcon.push(
                <div className="new-item-tag">
                    NEW
                </div>
            )
        }
        return sendIcon
    }

    const showProductInformation = () => {
        return (
            <div className="product-information">
                <div className="row align-items-center">
                    <div className="product-name mx-2">{product.product.name}</div>
                    <div className="mx-2">{showTrendyOrNew()}</div>
                    <div className="mx-2">{showRating()}</div>
                    <div className="mx-2">Total sold : {product.product.sold}</div>
                </div>
                <div className="product-description">{product.product.description}</div>
            </div>
        )
    }

    const showAddToCart = () => {
        return (
            <div className="row justify-content-center add-to-cart">
                <div>
                    <button className="btn btn-primary py-3 px-5 add-to-cart-btn"  onClick={addToCart}>Add to cart</button>
                </div>
                <div>
                    <button className="btn btn-danger py-3 px-5">Buy Now</button>
                </div>
            </div>
        )
    }

    const showSelectDetail = () => {
        return (
            <div className="select-detail-box">
                <h1 className="select-detail-box-title">Select detail</h1>
                {showDetails()}
                {showTotalPrice()}
                {showAddToCart()}
            </div>
        )
    }

    return product ? (
        <Layout>
            {console.log("what is prodict : ", product)}
            <div className="row mt-5 productDetail">
                <div className="col-7">
                    {showProductInformation()}
                    <TestCarousel item={product.product} />
                </div>
                <div className="col-5">
                    {showSelectDetail()}
                    {showReview()}
                </div>
            </div>
            <div className="row">
                {relatedProduct.map((c) => <div className="col-3"><Card product={c} /></div>)}
            </div>
        </Layout>
    ) : ""
}
export default ProductDetail