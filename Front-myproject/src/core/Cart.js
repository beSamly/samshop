import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";
import ShowImage from './ShowImage'

const Cart = () => {
    const [items, setItems] = useState();

    useEffect(() => {
        var a = getCart()
        console.log("afte getcart : ", a)
        setItems(a)
    }, []);

    const handleChange = (product, selecteDetailIndex) => (e) => {
        console.log("what is JSON.parse(e.target.value) : ", JSON.parse(e.target.value))
        console.log("selecteDetailIndex (2) : ", selecteDetailIndex)
        var itemsCopy = [...items]
        // console.log("prodcut_id : ", product._id)
        itemsCopy = itemsCopy.map((c) => {
            console.log("c.product._id === product._id : ", c.product._id === product._id, c.product._id,product._id)

            if (c.product._id === product.product._id) {

                c.selectedDetails[selecteDetailIndex] = {
                    selectedOption: JSON.parse(e.target.value),
                    quantity: e.target.parentNode.parentNode.querySelector('.quantity').value
                }
            }
            return c
        }
        )
        setItems(itemsCopy)
    }

    const handleAdd = (index) => (e) => {
        var itemsCopy = [...items]
        itemsCopy[index].selectedDetails.push(
            {
                selectedOption: {},
                quantity: 0
            }
        )
        setItems(itemsCopy)
    }

    const handleDelete = (itemIndex, selectedDetailIndex) => (e) => {
        var itemsCopy = [...items]
        itemsCopy[itemIndex].selectedDetails.splice(selectedDetailIndex, 1)
        setItems(itemsCopy)
    }

    // handleCahnge => get index from event.targe => go to selectedDetails field =>
    // details[index] = e.target.value and quantity
    // need to know which product and which index
    const handleQuantity = (inceaseOrDecrease, itemIndex, selectedDetailIndex) => (e) => {
        if (inceaseOrDecrease === "increase") {
            var itemsCopy = [...items]
            var value = e.target.parentNode.querySelector('.quantity').value
            itemsCopy[itemIndex].selectedDetails[selectedDetailIndex].quantity = parseInt(value) + 1
            setItems(itemsCopy)
        } else {
            var itemsCopy = [...items]
            var value = e.target.parentNode.querySelector('.quantity').value
            if (value > 1) {
                itemsCopy[itemIndex].selectedDetails[selectedDetailIndex].quantity = parseInt(value) - 1
                setItems(itemsCopy)
            }
        }
    }
    // index = index of item in item array
    const showDetails = (product, index) => {

        // i = index of selectedDetail array
        console.log("product : ", product)
        var a = product.selectedDetails.map((d, i) => {
            return (
                <div className="row">
                    <div className="col-6 px-0" >
                        <select className="form-control" onChange={handleChange(product, i)}>
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
                    <div className="col-3 px-0 row justify-content-center align-items-center">
                        <button className="btn btn-default py-1 px-3 my-2" onClick={handleQuantity('increase', index, i)}>+</button>
                        <input className="quantity form-control p-0 m-0" type="number" value={product.selectedDetails[i].quantity} style={{ width: 30 }} />
                        <button className="btn btn-default py-1 px-3 my-2" onClick={handleQuantity('decrease', index, i)} >-</button>
                    </div>
                    <div className="col-3 px-0 row align-items-center">
                        <button className="btn btn-primary py-1 px-3" onClick={handleAdd(index)}>+</button>
                        <button className="btn btn-danger py-1 px-3" onClick={handleDelete(index, i)}>-</button>
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

    const deleteItem = (index) => (e) => {
        var itemsCopy = [...items]
        itemsCopy.splice(index, 1)
        setItems(itemsCopy)
    }

    const showEachItem = (item, index) => {
        return (
            <div className="row cart-show-item my-4">
                <div className="col-3">
                    <ShowImage item={item.product} url="product" />
                </div>
                <div className="col-9">
                    <button className="btn delete-item" onClick={deleteItem(index)}>X</button>

                    <div>{item.product.name}</div>
                    <div>{item.product.description}</div>
                    {showDetails(item, index)}
                </div>
            </div>
        )
    }

    const showItems = () => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((item, i) => (
                    showEachItem(item, i)
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br />
        </h2>
    );

    return items ? (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="container-fluid"
        >
            <div className="row mt-5">
                <div className="col-7">
                    {items.length > 0 ? showItems() : noItemsMessage()}
                </div>

                <div className="col-5">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr />
                    {console.log("items : ", items)}
                    <Checkout products={items} />
                </div>
            </div>
        </Layout>
    ) : ""
};

export default Cart;
