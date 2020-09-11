import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter, Redirect } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/index'
import { getFilteredProducts } from '../core/apiCore'

import Layout from "../core/Layout";
import Card from "../core/Card";
import prices from "../core/fixedPrice.js"
import PageButton from "../core/PageButton";
import queryString from 'query-string';
import Filter from "../core/Filter2";
import AdminRouteLayout from "./AdminRouteLayout";
import Loader from "../core/Loader";

const AdminProductManage = ({ history, location }) => {
    console.log("what is location : ", location)
    const [myFilters, setMyFilters] = useState();
    const [error, setError] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

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

        if (!Array.isArray(category)) {
            var newCategory = []
            newCategory.push(category)
            category = newCategory
        }

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
            const priceRange = getPriceRange(filters)
            let indexOfDuplicate = undefined
            newFilters['price'].map((c, index) => {
                if (c['greaterThan'] === priceRange['greaterThan']) {
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

        if (filterBy === 'keyword') {
            document.querySelector()
        }

        console.log("what is newFilters after handling request : ", newFilters)
        newFilters['price'] = JSON.stringify(newFilters['price'])

        var sendQuery = queryString.stringify(newFilters)
        history.push(`/admin/dashboard/product/manage?${sendQuery}`)
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

    const handleSearch = (e) => {
        var target = e.target.parentNode.querySelector('input')
        var value = target.value
        history.push(`/admin/dashboard/product/manage?keyword=${value}`)
    }

    const handleChange = (e) => {
        setMyFilters({ ...myFilters, keyword: e.target.value })
    }

    const showSearchBar = () => {
        return (
            <div className="my-3">
                <div className="row">
                    <div className="col-4 row">
                        <input className="form-control w-75" type="text-area" placeholder="Search product" value={myFilters.keyword} onChange={handleChange} />
                        <button className="btn btn-primary px-3 py-1" onClick={handleSearch} >
                            <i className="fas fa-search fa-xs"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return myFilters ? (
        <AdminRouteLayout keywordIn={myFilters.keyword}>
            <Loader loading={loading}/>
            <Filter myFilters={myFilters} count={count} handleFilters={handleFilters} />
            <PageButton myFilters={myFilters} filters={myFilters} count={count} handleFilters={handleFilters} skip={myFilters.skip} />
            <span className="total-product-text">Total product : {count}</span>
            {showSearchBar()}
            <div className="row">
                {filteredResults.map((product) => {
                    return (<div className="col-4">
                        <Card product={product} linkTo={'/admin/dashboard/product/update/'} />
                    </div>)
                })}
            </div>
        </AdminRouteLayout>
    ) : ""
}

export default AdminProductManage