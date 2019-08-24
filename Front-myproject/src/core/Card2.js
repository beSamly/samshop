import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import ShowImage from './ShowImage'
import moment from "moment";
import { API } from '../config'


const Card = ({ product, forWhat = "normal", linkTo = '/product/' }) => {

    const showRating = () => {
        let arr = [];
        let avg = product.totalRate
        let length = product.reviews.length
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
                <div className="card-body-rating">
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

    const showTrendyOrNew = (product) => {
        const sendIcon = []
        if (product.totalRate >= 4) {
            sendIcon.push(
                <div className="trendy-item-tag">
                    HOT
                </div>
            )
        }

        var createdAt = moment(product.createdAt)
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

    return product ? (
        <div className="card mb-4">
            {showNoStock()}
            <Link style={{ color: 'black' }} to={{ pathname: `${linkTo}${product._id}` }}>
                <div className="card-header">
                    <img class="d-block w-100" src={`${API}/product/photo/${product._id}/${1}`}
                        alt="Second slide" style={{ width: 400, height: 200 }} />
                </div>
                <div className="card-body">
                    {/* {shouldRedirect(redirect)} */}
                    <p className="mt-1" style={{ fontWeight: 600 }}>
                        {product.name}
                    </p>
                    {showRating()}
                    <p className="black-9">
                    </p>
                    <div className="clearfix">
                        <div className="float-left">{showTrendyOrNew(product)}</div>
                        <div className="float-right price-tag">${product.price}</div>
                    </div>
                </div >
            </Link>
        </div>
    ) : ""
}

export default Card