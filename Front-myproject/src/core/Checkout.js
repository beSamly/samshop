import React, { useState, useEffect } from "react";
import {
    getProducts,
    getBraintreeClientToken,
    processPayment,
    createOrder
} from "./apiCore";
import { emptyCart } from "./cartHelpers";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link, withRouter } from "react-router-dom";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";

// Products arugment is products Array on localStorage
//  Products:[{
//     product:{},
//     selectedOptions:{
//     color:"",
//     size:"",
//     quantity:""
// }
// }]

const Checkout = ({ products, history }) => {
    const [data, setData] = useState({
        loading: true,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
        addresses: {}
    });

    const { addresses } = data

    const [totalPrice, setTotalPrice] = useState()

    const user = isAuthenticated() && isAuthenticated().user
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(ct => {
            if (ct.error) {
                setData({ ...data, error: ct.error });
            } else {
                setData({ ...data, clientToken: ct.clientToken });
            }
        });
    };

    const calTotalPrice = () => {
        var totalPrice = 0
        products.map((c) => {
            c.selectedDetails.map((c) => {
                totalPrice = totalPrice + parseInt(c.selectedOption.price) * parseInt(c.quantity)
            })
        })
        totalPrice = !isNaN(totalPrice) && totalPrice !== 0 ? `${totalPrice}` : "Please select option"
        setTotalPrice(totalPrice)
    }

    const init = () => {
        calTotalPrice()
    }

    useEffect(() => {
        getToken(userId, token);
        init()
    }, [products]);

    const handleAddress = (target) => e => {
        setData({ ...data, addresses: { ...addresses, [target]: e.target.value } });
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
                <button className="btn-primary">Sign in to checkout</button>
            );
    };
    let deliveryAddress = data.address;
    const buy = () => {
        setData({ loading: true });

        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                // console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
                // and also total to be charged
                // console.log(
                //     "send nonce and total to process: ",
                //     nonce,
                //     getTotal(products)
                // );
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: totalPrice
                };


                processPayment(userId, token, paymentData)
                    .then(response => {
                        // empty cart
                        // create order
                        // user update with addresses

                        // this is error handling.
                        if (response.message) {
                            setData({ ...data, error: response.message })
                        } else {

                            const createOrderData = {
                                products: products,
                                transaction_id: response.transaction.id,
                                totalPrice: response.transaction.amount,
                                addresses: addresses
                            };

                            createOrder(userId, token, createOrderData)
                                .then(response => {
                                    emptyCart(() => {
                                        console.log(
                                            "payment success and empty cart"
                                        );
                                        setData({
                                            loading: false,
                                            success: true
                                        });
                                    });
                                    history.push("/user/dashboard/history")
                                })
                                .catch(error => {
                                    console.log(error);
                                    setData({ loading: false });
                                });
                        }


                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
    };

    const showDropIn = () => (
        <div onBlur={() => { setData({ ...data, error: "" }) }}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <form className="address-form" >
                        <label>Address</label>
                        <input type="text-area" className="form-control" required onChange={handleAddress('address')} />
                        <label>Address2</label>
                        <input className="form-control" onChange={handleAddress('address2')} />
                        <label>City</label>
                        <input className="form-control" required onChange={handleAddress('city')} />
                        <label>Province</label>
                        <input className="form-control" required onChange={handleAddress('province')} />
                        <label>Zip code</label>
                        <input type="number" className="form-control" required onChange={handleAddress('zipcode')} />
                    </form>

                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: "vault"
                            }
                        }}
                        onInstance={instance => {
                            data.instance = instance;
                            setData({ ...data, loading: false })
                        }
                        }
                    />
                    <button onClick={buy} className="btn btn-success btn-block" disabled={!isNaN(totalPrice) ? "" : "disabled"}>
                        {!isNaN(totalPrice) ? "Pay" : "Select option"}
                    </button>
                </div>
            ) : null}
        </div>
    );

    const showError = error => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = success => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = loading => {
        return loading && (
            <div className="payment-loading row align-items-center justify-content-center">
                <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-yellow-only">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="gap-patch">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return products.length>0 ? (
        <div className="checkout-box">
            <h2 className="checkout-box-title">Total: ${totalPrice}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    ) : ""
};

export default withRouter(Checkout);
