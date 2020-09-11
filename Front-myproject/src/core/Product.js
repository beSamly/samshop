import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import Layout from "./Layout";
import Card from "./Card";
import { getFilteredProducts } from './apiCore'
import prices from "./fixedPrice.js"
import PageButton from "./PageButton";
import queryString from 'query-string';
import Filter from "./Filter2";
import Loader from "./Loader";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import $ from 'jquery'
import { previewInit } from "./previewJquery"

const Product = ({ location, history }) => {
    $(document).ready(function () {
        previewInit()
    })

    const [myFilters, setMyFilters] = useState();
    const [error, setError] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [dummy, setDummy] = useState(0)


    const loadFilteredResults = (newFilters) => {
        console.log("what is newfiletr : ", newFilters)
        getFilteredProducts(newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setCount(data.count)
                setLoading(false)
            }
        });
    };

    // its because category is not array now its single value
    const init = () => {
        var query = queryString.parse(location.search)
        console.log("what is query receivd : ", query)
        var category = query.category ? query.category : []
        var price = query.price ? JSON.parse(query.price) : []
        var limit = query.limit ? query.limit : 12
        var skip = query.skip ? query.skip : 0
        var sortBy = query.sortBy ? query.sortBy : '_id'
        var order = query.order ? query.order : 'desc'
        var keyword = query.keyword ? query.keyword : ""
        console.log("what is keryword : ", keyword)
        if (!Array.isArray(category)) {
            var newCategory = []
            newCategory.push(category)
            category = newCategory
        }

        // query.price && price.concat(query.category)

        // console.log("what is query : ", query)

        var go = {
            category,
            price,
            sortBy,
            order,
            skip,
            limit,
            keyword
        }

        setMyFilters(go)
        setLoading(true)
        loadFilteredResults(go);
    }

    useEffect(() => {
        init()
    }, [history.location])

    const handleFilters = (filters, filterBy) => {
        var newFilters = {}
        console.log("what is myFilters in state before changing according to request: ", myFilters)

        for (var key in myFilters) {
            newFilters[key] = myFilters[key]
        }

        if (filterBy === 'category') {
            // when already exist

            if (newFilters[filterBy].includes(filters)) {
                var filtered = []
                filtered = newFilters[filterBy].filter((value, index, arr) => {
                    return filters !== value
                })
                newFilters[filterBy] = filtered
            }
            // when its new
            else {
                newFilters[filterBy].push(filters);
            }
            newFilters['skip'] = 0;

        }

        if (filterBy === 'sortBy') {
            newFilters[filterBy] = filters;
            newFilters['skip'] = 0;
        }

        if (filterBy === 'price') {
            console.log("whast isfilters : ", filters)
            const priceRange = getPriceRange(filters)
            console.log("whast priceRange : ", priceRange)

            let indexOfDuplicate = undefined
            newFilters['price'].map((c, index) => {
                if (c['greaterThan'] === priceRange['greaterThan'] &&
                    c['lessThan'] === priceRange['lessThan']
                ) {
                    indexOfDuplicate = index
                }
            })
            // when already exsit
            if (indexOfDuplicate !== undefined) {
                newFilters['price'].splice(indexOfDuplicate, 1)
            }
            // when its new
            else {
                newFilters['price'].push(priceRange)
            }
            newFilters['skip'] = 0;
        }

        if (filterBy === 'skip') {
            var arg = parseInt(filters)
            arg = arg - 1
            var skipHowMany = newFilters.limit * arg
            newFilters['skip'] = skipHowMany
        }

        console.log("what is newFilters after handling request : ", newFilters)
        newFilters['price'] = JSON.stringify(newFilters['price'])

        var sendQuery = queryString.stringify(newFilters)
        history.push(`/products?${sendQuery}`)
    };

    const getPriceRange = (id) => {
        id = parseInt(id)
        let returnValue = undefined
        prices.map((c) => {
            if (c._id === id) {
                returnValue = c.array
            }
        })
        return returnValue
    }

    const showResult = () => {
        return (
            <div className="product-show-result row justify-content-center align-items-center">
                <div className="ml-3" ><i class="far fa-laugh"></i>  {count} products were found</div>
            </div>
        )
    }

    const addToCart = (product) => {
        addItem(product, () => {
            setDummy(dummy + 1)
        });
    };

    return myFilters ? (
        <Layout keywordIn={myFilters.keyword}>
            <div className="product-page-box">
                {showResult()}
                <div className="row justy-content-between align-items-center my-2">
                    <div className="col-9">
                        <Filter myFilters={myFilters} count={count} handleFilters={handleFilters} />
                    </div>
                    <div className="col-3">
                        <PageButton myFilters={myFilters} filters={myFilters} count={count} handleFilters={handleFilters} skip={myFilters.skip} />
                    </div>
                </div>
                <div className="row">
                    {filteredResults.map((product, index) => {
                        return (<div className="col-3">
                            <Card product={product} index={index} addToCartcallback={addToCart} />
                        </div>)
                    })}
                </div>
            </div>
            <Loader loading={loading} />
        </Layout>
    ) : ""

}

export default Product