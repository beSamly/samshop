import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";
import UserDashboardLayout from "./UserDashboardLayout";
import ShowImage from "../core/ShowImage"
import $ from 'jquery'
import Loader from "../core/Loader";

const UserDashboardHistory = () => {
    const [purchaseHistory, setPurchaseHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const init = () => {

    }

    useEffect(() => {
        const user = isAuthenticated().user
        const token = isAuthenticated().token
        getPurchaseHistory(user._id, token).then(
            res => {
                setPurchaseHistory(res);
                setLoading(false)
            }
        )
        window.scrollTo(0, 0);
    }, [])

    const showSelectedDetails = (selectedDetails) => {
        var returnArr = []
        selectedDetails.map((c) => {
            returnArr.push(
                <div className="row select-form">
                    <select className="form-control" disabled>
                        <option >{c.selectedOption.color} | {c.selectedOption.size} | ${c.selectedOption.price} | Quantity:{c.quantity} </option>
                    </select>
                </div>
            )
        })
        return returnArr

    }

    const showEachSelectedProduct = (eachSelectedProduct, index) => {

        return (
            <Link to={`/product/${eachSelectedProduct.product._id}`}>
                <div className="row history-show-product ">
                    <div className="col-2">
                        <ShowImage item={eachSelectedProduct.product} url="product" />
                    </div>
                    <div className="col-9">
                        <div>{eachSelectedProduct.product.name}</div>
                        <div>{eachSelectedProduct.product.description}</div>
                        <div>Details</div>
                        {showSelectedDetails(eachSelectedProduct.selectedDetails, index)}
                    </div>
                </div>
            </Link >
        )
    }

    const showAddresses = (addresses) => {
        const { address, address2, province, zipcode, city } = addresses
        return (
            <form className="address-form" disabled>
                <label>Address</label>
                <input type="text-area" className="form-control" required disabled value={address} />
                <label>Address2</label>
                <input className="form-control" disabled value={address2} />
                <label>City</label>
                <input className="form-control" disabled value={city} />
                <label>Province</label>
                <input className="form-control" disabled value={province} />
                <label>Zip code</label>
                <input type="number" className="form-control" disabled value={zipcode} />
            </form>
        )
    }

    const handleActive = (e) => {
        var parent = e.target.closest('.show-history-container')
        var target = parent.querySelector('.show-history-content-box')
        var plusOrMinus = parent.querySelector('.plusOrMinus')
        if (plusOrMinus.innerText === "+") {
            $(target).slideToggle()
            plusOrMinus.innerText = '-'
        } else {
            plusOrMinus.innerText = '+'
            $(target).slideToggle()
        }
    }

    const statusStyle = (status) => {
        if (status === "Not processed") {
            return (
                { color: "red" }
            )
        }
        if (status === "processed") {
            return (
                { color: "green" }
            )
        }
    }

    const showEachHistory = (eachHistory, index) => {

        return (
            <div className="show-history-container" >
                <div className="row justify-content-between align-items-center show-history-header" onClick={handleActive}>
                    <div className="col-9 row">
                        <div>{eachHistory.updatedAt.slice(0, 10)}</div>
                        <div>Total Price : ${eachHistory.totalPrice}</div>
                        <div>Status : <span style={statusStyle(eachHistory.status)}>{eachHistory.status}</span></div>

                    </div>
                    <div className="col-2 row justify-content-end align-items-center">
                        <div class="plusOrMinus" >+</div>
                    </div>
                </div>
                <div className="show-history-content-box mb-5">
                    {eachHistory.products.map((eachSelectedProduct) =>
                        showEachSelectedProduct(eachSelectedProduct)
                    )}
                    {showAddresses(eachHistory.addresses)}
                </div>
            </div>
        )
    }

    return (
        <UserDashboardLayout>
            <Loader loading={loading}/>
            <div className="history-header">There are {purchaseHistory.length} purchase history</div>
            {purchaseHistory.map((eachHistory, index) => (
                showEachHistory(eachHistory, index)
            ))}
        </UserDashboardLayout >
    )
}

export default UserDashboardHistory